package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.global.exception.exceptions.ForbiddenException;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentResDto;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReplyComment;
import com.ohgood.newstocks.reviewnote.mapper.ReplyCommentMapper;
import com.ohgood.newstocks.reviewnote.repository.ReplyCommentRepository;
import com.ohgood.newstocks.reviewnote.repository.ReplyRepository;
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

    @Transactional
    public ReplyCommentResDto insertReplyComment(ReplyCommentReqDto replyCommentReqDto,
        Long replyId, long memberId) {
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
        replyCommentResDto.checkMember(member);

        return replyCommentResDto;
    }

    public List<ReplyCommentResDto> findReplyComment(Long replyId, Long memberId) {
        Reply reply = findReplyById(replyId);
        Member member = findMemberById(memberId);

        List<ReplyComment> replyCommentList = replyCommentRepository.findByReply(reply);
        List<ReplyCommentResDto> replyCommentResDtoList = replyCommentList.stream()
            .map(ReplyCommentMapper.INSTANCE::entityToReplyCommentResDto).toList();
        replyCommentResDtoList.forEach(ReplyCommentResDto::addDetailDtos);
        replyCommentResDtoList.forEach(
            replyCommentResDto -> replyCommentResDto.checkMember(member));
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
    public void deleteReplyComment(Long replyCommentId, Long memberId) {
        ReplyComment replyComment = findReplyCommentById(replyCommentId);
        checkUserAuth(memberId, replyComment);
        replyComment.delete();
        replyCommentRepository.save(replyComment);
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
