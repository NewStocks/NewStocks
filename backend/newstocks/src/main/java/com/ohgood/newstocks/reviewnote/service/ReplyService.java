package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.global.exception.exceptions.ForbiddenException;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.reviewnote.dto.ReplyReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyResDto;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.mapper.ReplyMapper;
import com.ohgood.newstocks.reviewnote.repository.ReplyLikeRepository;
import com.ohgood.newstocks.reviewnote.repository.ReplyRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final ReviewNoteRepository reviewNoteRepository;
    private final MemberRepository memberRepository;
    private final ReplyLikeRepository replyLikeRepository;
    private final ReplyCommentService replyCommentService;

    @Transactional
    public ReplyResDto insertReply(ReplyReqDto replyReqDto, Long reviewNoteId, Long memberId) {
        Member member = findMemberById(memberId);
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        ReplyResDto replyResDto = ReplyMapper.INSTANCE.replyReqDtoToReplyResDto(replyReqDto);
        replyResDto.addDetails(member, reviewNote);

        Reply reply = replyRepository.save(ReplyMapper.INSTANCE.replyResDtoToEntity(replyResDto));
        reply.getReviewNote().getReplyList().add(reply);
        reviewNote.increaseReplyCount();

        replyResDto = ReplyMapper.INSTANCE.entityToReplyResDto(reply);
        replyResDto.addDetailDtos();
        replyResDto.checkMemberAndIsLiked(member, false);

        return replyResDto;
    }

    public List<ReplyResDto> findReply(Long reviewNoteId, Long memberId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(memberId);

        List<Reply> replyList = replyRepository.findByReviewNoteAndDeletedFalse(reviewNote);
        List<ReplyResDto> replyResDtoList = new ArrayList<>();

        // 각각의 댓글이 내 댓글인지, 좋아요 눌렀는지 확인
        for (Reply reply : replyList) {
            ReplyResDto replyResDto = ReplyMapper.INSTANCE.entityToReplyResDto(reply);
            Boolean isLiked = replyLikeRepository.findByReplyAndMember(reply, member).isPresent();
            replyResDto.checkMemberAndIsLiked(member, isLiked);
            replyResDto.addDetailDtos();
            replyResDto.addReplyComment(
                replyCommentService.findReplyComment(reply.getId(), memberId));
            replyResDtoList.add(replyResDto);
        }

        return replyResDtoList;
    }

    @Transactional
    public void updateReply(ReplyReqDto replyReqDto, Long replyId, Long memberId) {
        Reply reply = findReplyById(replyId);
        checkUserAuth(memberId, reply);
        reply.updateReply(replyReqDto);
        replyRepository.save(reply);
    }

    @Transactional
    public void deleteReply(Long replyId, Long memberId) {
        Reply reply = findReplyById(replyId);
        ReviewNote reviewNote = reply.getReviewNote();
        reviewNote.decreaseReplyCount();

        checkUserAuth(memberId, reply);
        reply.delete();
        replyRepository.save(reply);
    }

    @Transactional
    public void likeReply(Long replyId, Long memberId) {
        Reply reply = findReplyById(replyId);
        Member member = findMemberById(memberId);

        if (replyLikeRepository.findByReplyAndMember(reply, member).isPresent()) {
            throw new BadRequestException("이미 좋아요한 댓글입니다.");
        }
        replyLikeRepository.save(ReplyLike.builder().reply(reply).member(member).build());
        reply.increaseLikeCount();
    }

    @Transactional
    public void deleteLikeReply(Long replyId, Long memberId) {
        Reply reply = findReplyById(replyId);
        Member member = findMemberById(memberId);

        ReplyLike replyLike = replyLikeRepository.findByReplyAndMember(reply, member)
            .orElseThrow(() -> new BadRequestException("좋아요 하지 않은 댓글입니다."));
        replyLikeRepository.delete(replyLike);
        reply.decreaseLikeCount();
    }

    // -- 내부 메서드 --

    private void checkUserAuth(Long memberId, Reply reply) {
        // 관리자 권한 추가 생각하여 함수로 분리
        if (!reply.getMember().getId().equals(memberId)) {
            throw new ForbiddenException("권한이 없습니다");
        }
    }

    // -- 예외 처리용 코드 --

    public ReviewNote findReviewNoteById(Long reviewNoteId) {
        return reviewNoteRepository.findByIdAndDeletedFalse(reviewNoteId)
            .orElseThrow(() -> new BadRequestException("해당하는 오답노트가 없습니다."));
    }

    public Member findMemberById(Long memberId) {
        return memberRepository.findByIdAndDeletedFalse(memberId)
            .orElseThrow(() -> new BadRequestException("해당하는 회원이 없습니다."));
    }

    public Reply findReplyById(Long replyId) {
        return replyRepository.findByIdAndDeletedFalse(replyId)
            .orElseThrow(() -> new BadRequestException("해당하는 댓글이 없습니다."));
    }
}
