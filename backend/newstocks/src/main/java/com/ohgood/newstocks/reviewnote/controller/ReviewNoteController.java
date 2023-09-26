package com.ohgood.newstocks.reviewnote.controller;


import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteUpdateReqDto;
import com.ohgood.newstocks.reviewnote.service.ReviewNoteService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/review-note")
// TODO Authentication 처리 필요
public class ReviewNoteController {

    private final ReviewNoteService reviewNoteService;

    @PostMapping
    public ResponseEntity<ReviewNoteResDto> insertReviewNote(@ModelAttribute ReviewNoteReqDto reviewNoteReqDto) {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.insertReviewNote(reviewNoteReqDto, 5L), HttpStatus.OK);
    }

    @GetMapping("/{reviewNoteId}")
    public ResponseEntity<ReviewNoteResDto> findReviewNote(@PathVariable Long reviewNoteId) {
        return new ResponseEntity<>(reviewNoteService.findReviewNote(reviewNoteId, 5L), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<ReviewNoteResDto> updateReviewNote(ReviewNoteUpdateReqDto reviewNoteUpdateReqDto) {
        ReviewNoteController.log.info(reviewNoteUpdateReqDto + "");
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.updateReviewNote(reviewNoteUpdateReqDto, 5L), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}")
    public ResponseEntity<Void> deleteReviewNote(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        reviewNoteService.deleteReviewNote(reviewNoteId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find-my")
    public ResponseEntity<List<ReviewNoteResDto>> findMyReviewNoteList() {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.findMyReviewNoteList(5L), HttpStatus.OK);
    }

    @GetMapping("/find/{memberId}")
    public ResponseEntity<List<ReviewNoteResDto>> findOtherReviewNoteList(@PathVariable Long memberId) {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.findOtherReviewNoteList(memberId, 5L), HttpStatus.OK);
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<ReviewNoteResDto>> findAllReviewNoteList() {
        // Authentication 처리 전 임시 테스트
        System.out.println("컨트롤러 인");
        return new ResponseEntity<>(reviewNoteService.findAllReviewNoteList(5L), HttpStatus.OK);
    }

    @GetMapping("/find-hot")
    public ResponseEntity<List<ReviewNoteResDto>> findHotReviewNoteList() {
        return new ResponseEntity<>(reviewNoteService.findHotReviewNoteList(5L), HttpStatus.OK);
    }

    @GetMapping("/find-scrapped")
    public ResponseEntity<List<ReviewNoteResDto>> findScrapReviewNoteList() {
        return new ResponseEntity<>(reviewNoteService.findScrappedReviewNoteList(5L), HttpStatus.OK);
    }

    @PostMapping("/{reviewNoteId}/like")
    public ResponseEntity<Void> likeReviewNote(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        reviewNoteService.likeReviewNote(reviewNoteId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}/like")
    public ResponseEntity<Void> deleteLikeReviewNote(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        reviewNoteService.deleteLikeReviewNote(reviewNoteId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{reviewNoteId}/scrap")
    public ResponseEntity<Void> scrapReviewNote(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        reviewNoteService.scrapReviewNote(reviewNoteId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}/scrap")
    public ResponseEntity<Void> deleteScrapReviewNote(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        reviewNoteService.deleteScrapReviewNote(reviewNoteId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/pheed")
    public ResponseEntity<List<ReviewNoteResDto>> getPheed() {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.getPheed(5L), HttpStatus.OK);
    }
}
