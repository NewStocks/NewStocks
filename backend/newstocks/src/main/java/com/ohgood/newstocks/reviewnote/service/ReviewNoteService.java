package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.repository.NewsRepository;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteImageDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteLinkDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteImage;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLink;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteLinkRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteImageRepository;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteNews;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteNewsRepository;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import com.ohgood.newstocks.stock.entity.Stock;
import com.ohgood.newstocks.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewNoteService {

    private final ReviewNoteLinkRepository reviewNoteLinkRepository;

    private final ReviewNoteRepository reviewNoteRepository;
    private final MemberRepository memberRepository;
    private final StockRepository stockRepository;
    private final NewsRepository newsRepository;
    private final ReviewNoteNewsRepository reviewNoteNewsRepository;
    private final AwsS3Service awsS3Service;
    private final ReviewNoteImageRepository reviewNoteImageRepository;

    @Transactional
    public ReviewNoteResDto insertReviewNote(ReviewNoteReqDto reviewNoteReqDto, Long userId) {

        log.info("insertReviewNote Start");
        log.info("reviewNoteReqDto: " + reviewNoteReqDto);
        // Security 적용 전 테스트용
        Member member = findMemberById(userId);
        Stock stock = findStockById(reviewNoteReqDto.getStockId());

        // DTO -> Entity Mapstruct 위한 실제 객체 저장
        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.reviewNoteReqDtoToReviewNoteResDto(reviewNoteReqDto);
        reviewNoteResDto.addDetails(member, stock);

        ReviewNote reviewNote = ReviewNoteMapper.INSTANCE.reviewNoteResDtoToEntity(reviewNoteResDto);
        reviewNote = reviewNoteRepository.save(reviewNote);
        reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote);

        // 이미지 처리
        if (reviewNoteReqDto.getMultipartFileList() != null) {
            for (MultipartFile multipartFile : reviewNoteReqDto.getMultipartFileList()) {
                String url = awsS3Service.uploadFile("/review-note", multipartFile);
                ReviewNoteImage reviewNoteImage = reviewNoteImageRepository.save(new ReviewNoteImage(url, reviewNote));
                reviewNote.getReviewNoteImageList().add(reviewNoteImage);
                reviewNoteResDto.getReviewNoteImageDtoList().add(new ReviewNoteImageDto(reviewNoteImage.getId(), url));
            }
        }

        // 링크 처리
        if (reviewNoteReqDto.getLinkList() != null) {
            for (String url : reviewNoteReqDto.getLinkList()) {
                ReviewNoteLink reviewNoteLink = reviewNoteLinkRepository.save(new ReviewNoteLink(url, reviewNote));
                reviewNote.getReviewNoteLinkList().add(reviewNoteLink);
                reviewNoteResDto.getReviewNoteLinkList().add(new ReviewNoteLinkDto(reviewNoteLink.getId(), url));
            }
        }

        // TODO Stock, Member와는 형식이 다른데 통일할지 고민
        List<Long> newsIdList = reviewNoteReqDto.getNewsIdList();
        if (newsIdList != null) {
            for (Long newsId : newsIdList) {
                News news = findNewsById(newsId);
                ReviewNoteNews reviewNoteNews = reviewNoteNewsRepository.save(new ReviewNoteNews(reviewNote, news));
                reviewNote.getReviewNoteNewsList().add(reviewNoteNews);
                NewsDto newsDto = NewsMapper.INSTANCE.entityToNewsDto(news);
                reviewNoteResDto.getNewsDtoList().add(newsDto);
            }
        }

        reviewNote.getMember().getReviewNoteList().add(reviewNote);

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

    public ReviewNoteResDto updateReviewNote() {
        return null;
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

    public News findNewsById(Long newsId) {
        return newsRepository.findById(newsId).orElseThrow(() -> new ArithmeticException("해당하는 뉴스가 없습니다."));
    }
}
