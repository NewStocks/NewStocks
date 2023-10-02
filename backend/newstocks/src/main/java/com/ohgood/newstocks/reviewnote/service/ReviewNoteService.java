package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.global.exception.exceptions.ForbiddenException;
import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.member.entity.Follow;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.FollowRepository;
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
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLike;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLink;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteScrap;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteImageMapper;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteLinkMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteLikeRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteLinkRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteImageRepository;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteNews;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteNewsRepository;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteScrapRepository;
import com.ohgood.newstocks.stock.entity.Stock;
import com.ohgood.newstocks.stock.repository.StockRepository;
import java.util.ArrayList;
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
    private final ReplyService replyService;
    private final ReviewNoteLikeRepository reviewNoteLikeRepository;
    private final ReviewNoteScrapRepository reviewNoteScrapRepository;
    private final FollowRepository followRepository;

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

        checkAuthorityAndLikeAndScrap(member, reviewNote, reviewNoteResDto);
        log.info("저장 완료 " + ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(reviewNote));
        return reviewNoteResDto;
    }

    public ReviewNoteResDto findReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);

        if (Boolean.TRUE.equals(reviewNote.getPrivacy()) && !reviewNote.getMember()
            .equals(member)) {
            throw new ForbiddenException("오답노트 조회 권한이 없습니다.");
        }

        ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(
            reviewNote);
        reviewNoteResDto.addDetailDtos();

        checkAuthorityAndLikeAndScrap(member, reviewNote, reviewNoteResDto);
        reviewNoteResDto.addReply(replyService.findReply(reviewNoteId, userId));
        return reviewNoteResDto;
    }

    @Transactional
    public ReviewNoteResDto updateReviewNote(ReviewNoteUpdateReqDto reviewNoteUpdateReqDto,
        Long userId) {
        // 권한 확인
        ReviewNote reviewNote = findReviewNoteById(reviewNoteUpdateReqDto.getId());
        Member member = findMemberById(userId);

        checkUserAuth(userId, reviewNote);

        // 수정 처리, 사용 하기 위해 Setter 엶
        // Setter 다시 닫음
//        ReviewNoteMapper.INSTANCE.updateReviewNote(reviewNoteUpdateReqDto, reviewNote);
        reviewNote.updateReviewNote(reviewNoteUpdateReqDto);
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

        checkAuthorityAndLikeAndScrap(member, reviewNote, reviewNoteResDto);
        reviewNoteResDto.addReply(replyService.findReply(reviewNote.getId(), userId));

        return reviewNoteResDto;
    }

    @Transactional
    public void deleteReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        checkUserAuth(userId, reviewNote);
        reviewNote.delete();
        reviewNoteRepository.save(reviewNote);
    }

    public List<ReviewNoteResDto> findMyReviewNoteList(Long userId) {
        Member member = findMemberById(userId);
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByMemberAndDeletedFalse(member);
        return reviewNoteListToReviewNoteResDtoList(member, reviewNoteList);
    }

    public List<ReviewNoteResDto> findOtherReviewNoteList(Long findUserId, Long userId) {
        Member member = findMemberById(userId);
        Member findMember = findMemberById(findUserId);
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByPrivacyFalseAndMemberAndDeletedFalse(
            findMember);
        return reviewNoteListToReviewNoteResDtoList(member, reviewNoteList);
    }

    public List<ReviewNoteResDto> findAllReviewNoteList(Long userId) {
        Member member = findMemberById(userId);
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByPrivacyFalseOrMemberAndDeletedFalse(
            member);
        return reviewNoteListToReviewNoteResDtoList(member, reviewNoteList);
    }

    public List<ReviewNoteResDto> findHotReviewNoteList(Long userId) {
        Member member = findMemberById(userId);
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByPrivacyFalseAndDeletedFalseOrderByLikeCountDesc();

        return reviewNoteListToReviewNoteResDtoList(member, reviewNoteList);
    }

    public List<ReviewNoteResDto> findScrappedReviewNoteList(Long userId) {
        Member member = findMemberById(userId);
        List<ReviewNote> reviewNoteList = member.getReviewNoteScrapList().stream()
            .map(ReviewNoteScrap::getReviewNote).filter(reviewNote -> !reviewNote.getDeleted())
            .toList();
        return reviewNoteListToReviewNoteResDtoList(member, reviewNoteList);
    }

    public List<ReviewNoteResDto> findKeywordReviewNoteList(Long userId, String keyword) {
        Member member = findMemberById(userId);
        log.info(keyword);
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByPrivacyFalseAndDeletedFalseAndAndTitleContainingOrContentContaining(
            keyword, keyword);
        return reviewNoteListToReviewNoteResDtoList(member, reviewNoteList);
    }

    @Transactional
    public void likeReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);
        if (reviewNoteLikeRepository.findByReviewNoteAndMember(reviewNote, member).isPresent()) {
            throw new BadRequestException("이미 좋아요한 오답노트입니다.");
        }
        ReviewNoteLike reviewNoteLike = reviewNoteLikeRepository.save(
            ReviewNoteLike.builder().reviewNote(reviewNote).member(member).build());
        member.getReviewNoteLikeList().add(reviewNoteLike);
        reviewNote.getReviewNoteLikeList().add(reviewNoteLike);
        reviewNote.increaseLikeCount();
    }

    @Transactional
    public void deleteLikeReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);
        ReviewNoteLike reviewNoteLike = reviewNoteLikeRepository.findByReviewNoteAndMember(
                reviewNote, member)
            .orElseThrow(() -> new ArithmeticException("좋아요 하지 않은 오답노트입니다."));
        member.getReviewNoteLikeList().remove(reviewNoteLike);
        reviewNote.getReviewNoteLikeList().remove(reviewNoteLike);
        reviewNote.decreaseLikeCount();
        reviewNoteLikeRepository.delete(reviewNoteLike);
    }

    @Transactional
    public void scrapReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);
        if (reviewNoteScrapRepository.findByReviewNoteAndMember(reviewNote, member).isPresent()) {
            throw new BadRequestException("이미 스크랩한 오답노트입니다.");
        }
        ReviewNoteScrap reviewNoteScrap = reviewNoteScrapRepository.save(
            ReviewNoteScrap.builder().reviewNote(reviewNote).member(member).build());
        member.getReviewNoteScrapList().add(reviewNoteScrap);
        reviewNote.getReviewNoteScrapList().add(reviewNoteScrap);
        reviewNote.increaseScrapCount();
    }

    @Transactional
    public void deleteScrapReviewNote(Long reviewNoteId, Long userId) {
        ReviewNote reviewNote = findReviewNoteById(reviewNoteId);
        Member member = findMemberById(userId);
        ReviewNoteScrap reviewNoteScrap = reviewNoteScrapRepository.findByReviewNoteAndMember(
                reviewNote, member)
            .orElseThrow(() -> new ArithmeticException("스크랩 하지 않은 오답노트입니다."));

        member.getReviewNoteScrapList().remove(reviewNoteScrap);
        reviewNote.getReviewNoteScrapList().remove(reviewNoteScrap);
        reviewNote.decreaseScrapCount();
        reviewNoteScrapRepository.delete(reviewNoteScrap);
    }

    public List<ReviewNoteResDto> getPheed(Long followerId) {
        Member follower = findMemberById(followerId);
        List<Long> followingIdList = followRepository.findByFollowerId(followerId).stream()
            .map(Follow::getFollowingId).toList();
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findByMemberInAndPrivacyFalseAndDeletedFalse(
            memberRepository.findByIdInAndDeletedFalse(followingIdList));

        return reviewNoteListToReviewNoteResDtoList(follower, reviewNoteList);
    }

    // -- 내부 메서드 코드 --

    private void insertReviewNoteLinkToReviewNote(ReviewNote reviewNote, List<String> urlList,
        ReviewNoteResDto reviewNoteResDto) {
        if (urlList == null) {
            return;
        }
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

    private void checkUserAuth(Long userId, ReviewNote reviewNote) {
        // 관리자 권한 추가 생각하여 함수로 분리
        if (!reviewNote.getMember().getId().equals(userId)) {
            throw new ForbiddenException("권한이 없습니다");
        }
    }

    private void checkAuthorityAndLikeAndScrap(Member member, ReviewNote reviewNote,
        ReviewNoteResDto reviewNoteResDto) {
        Boolean hasAuthority = reviewNote.getMember().equals(member);
        Boolean isLiked = reviewNoteLikeRepository.findByReviewNoteAndMember(reviewNote, member)
            .isPresent();
        Boolean isScraped = reviewNoteScrapRepository.findByReviewNoteAndMember(reviewNote, member)
            .isPresent();
        reviewNoteResDto.checkMember(hasAuthority, isLiked, isScraped);
    }

    private List<ReviewNoteResDto> reviewNoteListToReviewNoteResDtoList(Member member,
        List<ReviewNote> reviewNoteList) {
        // Like Scrap 체크할 때 reviewNote 객체 필요해서 stream 제거
        List<ReviewNoteResDto> reviewNoteResDtoList = new ArrayList<>();
        for (ReviewNote reviewNote : reviewNoteList) {
            ReviewNoteResDto reviewNoteResDto = ReviewNoteMapper.INSTANCE.entityToReviewNoteResDto(
                reviewNote);
            checkAuthorityAndLikeAndScrap(member, reviewNote, reviewNoteResDto);
            reviewNoteResDto.addDetailDtos();
            reviewNoteResDtoList.add(reviewNoteResDto);
        }
        return reviewNoteResDtoList;
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

    public Stock findStockById(String stockId) {
        return stockRepository.findById(stockId)
            .orElseThrow(() -> new BadRequestException("해당하는 주식이 없습니다."));
    }

    public News findNewsById(Long newsId) {
        return newsRepository.findById(newsId)
            .orElseThrow(() -> new BadRequestException("해당하는 뉴스가 없습니다."));
    }
}
