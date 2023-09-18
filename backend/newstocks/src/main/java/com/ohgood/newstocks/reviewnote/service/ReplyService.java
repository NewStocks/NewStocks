package com.ohgood.newstocks.reviewnote.service;

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

        replyResDto = ReplyMapper.INSTANCE.entityToReplyResDto(reply);
        replyResDto.addDetailDtos();
        replyResDto.checkMember(member);

        return replyResDto;
    }

    public List<ReplyResDto> findReply(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);

        List<Reply> replyList = replyRepository.findByReviewNote(reviewNote);
        List<ReplyResDto> replyResDtoList = replyList.stream().map(ReplyMapper.INSTANCE::entityToReplyResDto).toList();
        replyResDtoList.forEach(ReplyResDto::addDetailDtos);
        replyResDtoList.forEach(replyResDto -> replyResDto.checkMember(member));
        return replyResDtoList;
    }
    // -- 내부 메서드 --

    // -- 예외 처리용 코드 --

    public ReviewNote findReviewNoteById(Long reviewNoteId) {
        return reviewNoteRepository.findByIdAndDeletedFalse(reviewNoteId)
            .orElseThrow(() -> new ArithmeticException("해당하는 오답노트가 없습니다."));
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
    }
}
