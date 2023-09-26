package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.global.exception.exceptions.ForbiddenException;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.reviewnote.dto.ReplyReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyResDto;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.mapper.ReplyMapper;
import com.ohgood.newstocks.reviewnote.repository.ReplyRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
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


    @Transactional
    public ReplyResDto insertReply(ReplyReqDto replyReqDto, Long reviewNoteId, Long userId) {
        Member member = findMemberById(userId);
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        ReplyResDto replyResDto = ReplyMapper.INSTANCE.replyReqDtoToReplyResDto(replyReqDto);
        replyResDto.addDetails(member, reviewNote);

        Reply reply = replyRepository.save(ReplyMapper.INSTANCE.replyResDtoToEntity(replyResDto));
        reply.getReviewNote().getReplyList().add(reply);
        reviewNote.increaseReplyCount();

        replyResDto = ReplyMapper.INSTANCE.entityToReplyResDto(reply);
        replyResDto.addDetailDtos();
        replyResDto.checkMember(member);

        return replyResDto;
    }

    public List<ReplyResDto> findReply(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);

        List<Reply> replyList = replyRepository.findByReviewNote(reviewNote);
        List<ReplyResDto> replyResDtoList = replyList.stream()
            .map(ReplyMapper.INSTANCE::entityToReplyResDto).toList();
        replyResDtoList.forEach(ReplyResDto::addDetailDtos);
        replyResDtoList.forEach(replyResDto -> replyResDto.checkMember(member));
        return replyResDtoList;
    }

    @Transactional
    public void updateReply(ReplyReqDto replyReqDto, Long replyId, Long userId) {
        Reply reply = findReplyById(replyId);
        checkUserAuth(userId, reply);
        reply.updateReply(replyReqDto);
        replyRepository.save(reply);
    }

    @Transactional
    public void deleteReply(Long replyId, Long userId) {
        Reply reply = findReplyById(replyId);
        ReviewNote reviewNote = reply.getReviewNote();
        reviewNote.decreaseReplyCount();

        checkUserAuth(userId, reply);
        reply.delete();
        replyRepository.save(reply);
    }

    // -- 내부 메서드 --

    private void checkUserAuth(Long userId, Reply reply) {
        // 관리자 권한 추가 생각하여 함수로 분리
        if (!reply.getMember().getId().equals(userId)) {
            throw new ForbiddenException("권한이 없습니다");
        }
    }

    // -- 예외 처리용 코드 --

    public ReviewNote findReviewNoteById(Long reviewNoteId) {
        return reviewNoteRepository.findByIdAndDeletedFalse(reviewNoteId)
            .orElseThrow(() -> new BadRequestException("해당하는 오답노트가 없습니다."));
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new BadRequestException("해당하는 회원이 없습니다."));
    }

    public Reply findReplyById(Long replyId) {
        return replyRepository.findByIdAndDeletedFalse(replyId)
            .orElseThrow(() -> new BadRequestException("해당하는 댓글이 없습니다."));
    }
}
