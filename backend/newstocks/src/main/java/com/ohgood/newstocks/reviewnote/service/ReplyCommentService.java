package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.global.exception.exceptions.ForbiddenException;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentResDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyResDto;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReplyComment;
import com.ohgood.newstocks.reviewnote.entity.ReplyCommentLike;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.mapper.ReplyCommentMapper;
import com.ohgood.newstocks.reviewnote.mapper.ReplyMapper;
import com.ohgood.newstocks.reviewnote.repository.ReplyCommentLikeRepository;
import com.ohgood.newstocks.reviewnote.repository.ReplyCommentRepository;
import com.ohgood.newstocks.reviewnote.repository.ReplyRepository;
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
public class ReplyCommentService {

    private final ReplyCommentRepository replyCommentRepository;
    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;
    private final ReplyCommentLikeRepository replyCommentLikeRepository;

    @Transactional
    public ReplyCommentResDto insertReplyComment(ReplyCommentReqDto replyCommentReqDto,
        Long replyId, Long memberId) {
        Member member = findMemberById(memberId);
        Reply reply = findReplyById(replyId);

        ReplyCommentResDto replyCommentResDto = ReplyCommentMapper.INSTANCE.replyCommentReqDtoToReplyCommentResDto(
            replyCommentReqDto);
        replyCommentResDto.addDetails(member, reply);
        ReplyComment replyComment = replyCommentRepository.save(
            ReplyCommentMapper.INSTANCE.replyCommentResDtoToEntity(replyCommentResDto));
        replyComment.getReply().getReplyCommentList().add(replyComment);

        replyCommentResDto = ReplyCommentMapper.INSTANCE.entityToReplyCommentResDto(replyComment);
        replyCommentResDto.addDetailDtos();
        replyCommentResDto.checkMemberAndIsLiked(member, false);
        reply.getReviewNote().increaseReplyCount();

        return replyCommentResDto;
    }

    public List<ReplyCommentResDto> findReplyComment(Long replyId, Long memberId) {
        Reply reply = findReplyById(replyId);
        Member member = findMemberById(memberId);

        List<ReplyComment> replyCommentList = replyCommentRepository.findByReply(reply);
        List<ReplyCommentResDto> replyCommentResDtoList = new ArrayList<>();

        for (ReplyComment replyComment : replyCommentList) {
            ReplyCommentResDto replyCommentResDto = ReplyCommentMapper.INSTANCE.entityToReplyCommentResDto(
                replyComment);
            Boolean isLiked = replyCommentLikeRepository.findByReplyCommentAndMember(replyComment,
                member).isPresent();
            replyCommentResDto.checkMemberAndIsLiked(member, isLiked);
            replyCommentResDto.addDetailDtos();
            replyCommentResDtoList.add(replyCommentResDto);
        }

        return replyCommentResDtoList;
    }

    @Transactional
    public void updateReplyComment(ReplyCommentReqDto replyCommentReqDto, Long replyCommentId,
        Long memberId) {
        ReplyComment replyComment = findReplyCommentById(replyCommentId);
        checkUserAuth(memberId, replyComment);
        replyComment.updateReplyComment(replyCommentReqDto);
        replyCommentRepository.save(replyComment);
    }

    @Transactional
    public void deleteReplyComment(Long replyId, Long replyCommentId, Long memberId) {
        ReplyComment replyComment = findReplyCommentById(replyCommentId);
        Reply reply = findReplyById(replyId);

        reply.getReviewNote().decreaseReplyCount();
        checkUserAuth(memberId, replyComment);
        replyComment.delete();
        replyCommentRepository.save(replyComment);
    }

    @Transactional
    public void likeReplyComment(Long replyCommentId, Long memberId) {
        ReplyComment replyComment = findReplyCommentById(replyCommentId);
        Member member = findMemberById(memberId);

        if (replyCommentLikeRepository.findByReplyCommentAndMember(replyComment, member)
            .isPresent()) {
            throw new BadRequestException("이미 좋아요한 대댓글입니다.");
        }
        replyCommentLikeRepository.save(
            ReplyCommentLike.builder().replyComment(replyComment).member(member).build());
        replyComment.increaseLikeCount();
    }

    @Transactional
    public void deleteLikeReplyComment(Long replyCommentId, Long memberId) {
        ReplyComment replyComment = findReplyCommentById(replyCommentId);
        Member member = findMemberById(memberId);

        ReplyCommentLike replyCommentLike = replyCommentLikeRepository.findByReplyCommentAndMember(
                replyComment, member)
            .orElseThrow(() -> new BadRequestException("좋아요 하지 않은 대댓글입니다."));
        replyCommentLikeRepository.delete(replyCommentLike);
        replyComment.decreaseLikeCount();
    }

    // -- 내부 메서드 --
    private void checkUserAuth(Long memberId, ReplyComment replyComment) {
        // 관리자 권한 추가 생각하여 함수로 분리
        if (!replyComment.getMember().getId().equals(memberId)) {
            throw new ForbiddenException("권한이 없습니다");
        }
    }

    // -- 예외 처리용 코드 --
    public Member findMemberById(Long memberId) {
        return memberRepository.findByIdAndDeletedFalse(memberId)
            .orElseThrow(() -> new BadRequestException("해당하는 회원이 없습니다."));
    }

    public Reply findReplyById(Long replyId) {
        return replyRepository.findByIdAndDeletedFalse(replyId)
            .orElseThrow(() -> new BadRequestException("해당하는 댓글이 없습니다."));
    }

    private ReplyComment findReplyCommentById(Long replyCommentId) {
        return replyCommentRepository.findReplyCommentById(replyCommentId)
            .orElseThrow(() -> new BadRequestException("해당하는 대댓글이 없습니다."));
    }
}
