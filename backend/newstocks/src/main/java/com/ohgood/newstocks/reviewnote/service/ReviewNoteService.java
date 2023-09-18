package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.MemberRepository;
import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.repository.NewsRepository;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteLinkDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteUpdateReqDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteImage;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLink;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteImageMapper;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteLinkMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteLinkRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteImageRepository;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteNews;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteNewsRepository;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import com.ohgood.newstocks.stock.entity.Stock;
import com.ohgood.newstocks.stock.repository.StockRepository;
import java.util.HashSet;
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

    private static final String DIR = "/review-note";

    @Transactional
    public ReviewNoteResDto insertReviewNote(ReviewNoteReqDto reviewNoteReqDto, Long userId) {

        log.info("insertReviewNote Start");
        log.info("reviewNoteReqDto: " + reviewNoteReqDto);
        // Security 적용 전 테스트용
        Member member = findMemberById(userId);
        Stock stock = findStockById(reviewNoteReqDto.getStockId());

        // DTO -> Entity Mapstruct 위한 실제 객체 저장
        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.reviewNoteReqDtoToReviewNoteResDto(
            reviewNoteReqDto);
        reviewNoteResDto.addDetails(member, stock);

        ReviewNote reviewNote = ReviewNoteMapper.INSTANCE.reviewNoteResDtoToEntity(
            reviewNoteResDto);
        reviewNote = reviewNoteRepository.save(reviewNote);
        reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote);

        // TODO 로직 분리

        // 이미지 처리
        uploadImageListToS3(reviewNote, reviewNoteReqDto.getMultipartFileList(), reviewNoteResDto);

        // 링크 처리
        insertReviewNoteLinkToReviewNote(reviewNote, reviewNoteReqDto.getLinkList(),
            reviewNoteResDto);

        // 사용하지 않게 된 코드
        // insertReviewNoteNewsToReviewNote(reviewNote, reviewNoteReqDto, reviewNoteResDto);

        // Member, Stock 등 DTO 정보 저장
        reviewNoteResDto.addDetailDtos();
        log.info("오답노트의 멤버 " + reviewNote.getMember());

        reviewNoteResDto.checkMember(member);

        log.info("저장 완료 " + ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote));
        return reviewNoteResDto;
    }

    public ReviewNoteResDto findReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);

        if (Boolean.TRUE.equals(reviewNote.getPrivacy()) && !reviewNote.getMember()
            .equals(member)) {
            throw new ArithmeticException("오답노트 조회 권한이 없습니다.");
        }

        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(
            reviewNote);
        reviewNoteResDto.addDetailDtos();

        reviewNoteResDto.checkMember(member);

        return reviewNoteResDto;
    }

    @Transactional
    public ReviewNoteResDto updateReviewNote(ReviewNoteUpdateReqDto reviewNoteUpdateReqDto,
        Long userId) {
        // 권한 확인
        ReviewNote reviewNote = findReviewNoteById(reviewNoteUpdateReqDto.getId());
        Member member = findMemberById(userId);

        if (!checkUserAuth(userId, reviewNote)) {
            log.debug("글을 수정할 권한이 없습니다.");
            throw new ArithmeticException("글을 수정할 권한이 없습니다.");
        }

        // 수정 처리, 사용 하기 위해 Setter 엶
        ReviewNoteMapper.INSTANCE.updateReviewNote(reviewNoteUpdateReqDto, reviewNote);
        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(
            reviewNote);
        log.info("업데이트" + reviewNote);

        // TODO 로직 분리

        // 이미지 삭제 처리
        if (reviewNoteUpdateReqDto.getDeletedImageIdList() != null) {
            HashSet<Long> deletedImageIdList = new HashSet<>(
                reviewNoteUpdateReqDto.getDeletedImageIdList());
            for (ReviewNoteImage reviewNoteImage : reviewNote.getReviewNoteImageList()) {
                if (deletedImageIdList.contains(reviewNoteImage.getId())) {
                    reviewNoteImage.delete();
                    reviewNoteImageRepository.save(reviewNoteImage);
                }
            }
        }

        // 이미지 추가 처리
        uploadImageListToS3(reviewNote, reviewNoteUpdateReqDto.getMultipartFileList(),
            reviewNoteResDto);

        // 링크 추가 삭제 처리 (hard delete)
        // 좋은 방법 있는지 고민 필요
        reviewNoteLinkRepository.deleteAll(reviewNote.getReviewNoteLinkList());
        reviewNote.getReviewNoteLinkList().clear();

        // 링크 추가
        insertReviewNoteLinkToReviewNote(reviewNote, reviewNoteUpdateReqDto.getLinkList(),
            reviewNoteResDto);

        // TODO Member, Stock -> res 추가 필요
        reviewNoteResDto.addDetailDtos();

        reviewNoteResDto.checkMember(member);

        return reviewNoteResDto;
    }

    @Transactional
    public void deleteReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        if (!checkUserAuth(userId, reviewNote)) {
            throw new ArithmeticException("삭제 권한이 없습니다.");
        }
        reviewNote.delete();
        reviewNoteRepository.save(reviewNote);
    }

    @Transactional
    public List<ReviewNoteResDto> findAllReviewNoteList(Long userId) {
        Member member = findMemberById(userId);
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByDeletedFalseAndPrivacyFalseOrMember(
            member);
        List<ReviewNoteResDto> reviewNoteResDtoList = reviewNoteList.stream()
            .map(ReviewNoteMapper.INSTANCE::entityToReviewNoteResDto).toList();
        reviewNoteResDtoList.forEach(ReviewNoteResDto::addDetailDtos);
        reviewNoteResDtoList.forEach(reviewNoteResDto -> reviewNoteResDto.checkMember(member));
        return reviewNoteResDtoList;
    }

    // -- 내부 메서드 코드 --

    private void insertReviewNoteLinkToReviewNote(ReviewNote reviewNote, List<String> urlList,
        ReviewNoteResDto reviewNoteResDto) {
        List<ReviewNoteLink> reviewNoteLinkList = urlList.stream()
            .map(url -> reviewNoteLinkRepository.save(ReviewNoteLink.builder()
                .url(url)
                .reviewNote(reviewNote).build()))
            .toList();
        log.info("" + reviewNoteLinkList);
        reviewNote.updateReviewNoteLink(reviewNoteLinkList);

        List<ReviewNoteLinkDto> reviewNoteLinkDtoList = reviewNoteLinkList.stream()
            .map(ReviewNoteLinkMapper.INSTANCE::entityToReviewNoteLinkDto)
            .toList();
        log.info("" + reviewNoteLinkDtoList);
        reviewNoteResDto.setReviewNoteLinkDtoList(reviewNoteLinkDtoList);
    }

    private void uploadImageListToS3(ReviewNote reviewNote, List<MultipartFile> multipartFileList,
        ReviewNoteResDto reviewNoteResDto) {
        if (multipartFileList != null) {
            for (MultipartFile multipartFile : multipartFileList) {
                String url = awsS3Service.uploadFile(DIR, multipartFile);
                ReviewNoteImage reviewNoteImage = reviewNoteImageRepository.save(
                    ReviewNoteImage.builder()
                        .url(url)
                        .reviewNote(reviewNote)
                        .build());
                // 기존의 이미지 삭제 X -> add 필요
                reviewNote.getReviewNoteImageList().add(reviewNoteImage);
                reviewNoteResDto.getReviewNoteImageDtoList().add(
                    ReviewNoteImageMapper.INSTANCE.entityToReviewNoteImageDto(reviewNoteImage));
            }
        }
    }

    // 사용하지 않는 코드
    private void insertReviewNoteNewsToReviewNote(ReviewNote reviewNote,
        ReviewNoteReqDto reviewNoteReqDto, ReviewNoteResDto reviewNoteResDto) {
        // TODO Stock, Member와는 형식이 다른데 통일할지 고민
        List<Long> newsIdList = reviewNoteReqDto.getNewsIdList();
        if (newsIdList != null) {
            for (Long newsId : newsIdList) {
                News news = findNewsById(newsId);
                ReviewNoteNews reviewNoteNews = reviewNoteNewsRepository.save(
                    ReviewNoteNews.builder()
                        .reviewNote(reviewNote)
                        .news(news)
                        .build());
                reviewNote.getReviewNoteNewsList().add(reviewNoteNews);
                NewsDto newsDto = NewsMapper.INSTANCE.entityToNewsDto(news);
                reviewNoteResDto.getNewsDtoList().add(newsDto);
            }
        }

        reviewNote.getMember().getReviewNoteList().add(reviewNote);
    }

    private boolean checkUserAuth(Long userId, ReviewNote reviewNote) {
        // 관리자 권한 추가 생각하여 함수로 분리
        return reviewNote.getMember().getId().equals(userId);
    }

    // -- 예외 처리용 코드 --

    public ReviewNote findReviewNoteById(Long reviewNoteId) {
        return reviewNoteRepository.findByIdAndDeletedFalse(reviewNoteId)
            .orElseThrow(() -> new ArithmeticException("해당하는 오답노트가 없습니다."));
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
    }

    public Stock findStockById(String stockId) {
        return stockRepository.findById(stockId)
            .orElseThrow(() -> new ArithmeticException("해당하는 주식이 없습니다."));
    }

    public News findNewsById(Long newsId) {
        return newsRepository.findById(newsId)
            .orElseThrow(() -> new ArithmeticException("해당하는 뉴스가 없습니다."));
    }

}
