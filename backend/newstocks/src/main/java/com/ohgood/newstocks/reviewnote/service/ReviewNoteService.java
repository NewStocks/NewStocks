package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import com.ohgood.newstocks.stock.entity.Stock;
import com.ohgood.newstocks.stock.mapper.StockMapper;
import com.ohgood.newstocks.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewNoteService {

    private final ReviewNoteRepository reviewNoteRepository;
    private final MemberRepository memberRepository;
    private final StockRepository stockRepository;

    @Transactional
    public ReviewNoteResDto insertReviewNote(ReviewNoteReqDto reviewNoteReqDto, Long userId) {

        log.info("insertReviewNote Start");

        // Security 적용 전 테스트용
        Member member = findMemberById(userId);
        Stock stock = findStockById(reviewNoteReqDto.getStockId());

        // DTO -> Entity Mapstruct 위한 실제 객체 저장
        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.reviewNoteReqDtoToReviewNoteResDto(reviewNoteReqDto);
        reviewNoteResDto.addDetails(member, stock);

        ReviewNote reviewNote = ReviewNoteMapper.INSTANCE.reviewNoteResDtoToEntity(reviewNoteResDto);

        reviewNote.getMember().getReviewNoteList().add(reviewNote);
        reviewNote = reviewNoteRepository.save(reviewNote);

        reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote);
        // Member, Stock 등 DTO 정보 저장
        reviewNoteResDto.addDetailDtos(member, stock);
        log.info("오답노트의 멤버 " + reviewNote.getMember());

        log.info("저장 완료 " + ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote));
        return reviewNoteResDto;
    }


    public ReviewNoteResDto findReviewNote(Long reviewNoteId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote);
        reviewNoteResDto.addDetailDtos(reviewNote.getMember(), reviewNote.getStock());

        return reviewNoteResDto;
    }

    public ReviewNote findReviewNoteById(Long reviewNoteId) {
        return reviewNoteRepository.findByIdAndDeletedFalse(reviewNoteId).orElseThrow(() -> new ArithmeticException("해당하는 오답노트가 없습니다."));
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId).orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
    }

    public Stock findStockById(String stockId) {
        return stockRepository.findById(stockId).orElseThrow(() -> new ArithmeticException("해당하는 주식이 없습니다."));
    }
}
