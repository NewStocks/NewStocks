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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/review-note")
// TODO Authentication 처리 필요
public class ReviewNoteController {

    private final ReviewNoteService reviewNoteService;

    @PostMapping
    public ResponseEntity<ReviewNoteResDto> insertReviewNote(
        @ModelAttribute ReviewNoteReqDto reviewNoteReqDto, Authentication authentication) {
        return new ResponseEntity<>(
            reviewNoteService.insertReviewNote(reviewNoteReqDto, Long.parseLong(
                authentication.getName())),
            HttpStatus.OK);
    }

    @GetMapping("/{reviewNoteId}")
    public ResponseEntity<ReviewNoteResDto> findReviewNote(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        return new ResponseEntity<>(reviewNoteService.findReviewNote(reviewNoteId, Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<ReviewNoteResDto> updateReviewNote(
        ReviewNoteUpdateReqDto reviewNoteUpdateReqDto, Authentication authentication) {
        return new ResponseEntity<>(
            reviewNoteService.updateReviewNote(reviewNoteUpdateReqDto, Long.parseLong(
                authentication.getName())), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}")
    public ResponseEntity<Void> deleteReviewNote(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        reviewNoteService.deleteReviewNote(reviewNoteId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find-my")
    public ResponseEntity<List<ReviewNoteResDto>> findMyReviewNoteList(
        Authentication authentication) {
        return new ResponseEntity<>(reviewNoteService.findMyReviewNoteList(Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @GetMapping("/find/{memberId}")
    public ResponseEntity<List<ReviewNoteResDto>> findOtherReviewNoteList(
        @PathVariable Long memberId, Authentication authentication) {
        return new ResponseEntity<>(
            reviewNoteService.findOtherReviewNoteList(memberId, Long.parseLong(
                authentication.getName())),
            HttpStatus.OK);
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<ReviewNoteResDto>> findAllReviewNoteList(
        Authentication authentication) {
        System.out.println("컨트롤러 인");
        return new ResponseEntity<>(reviewNoteService.findAllReviewNoteList(Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @GetMapping("/find-hot")
    public ResponseEntity<List<ReviewNoteResDto>> findHotReviewNoteList(
        Authentication authentication) {
        return new ResponseEntity<>(reviewNoteService.findHotReviewNoteList(Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @GetMapping("/find-keyword/{keyword}")
    public ResponseEntity<List<ReviewNoteResDto>> findKeywordReviewNoteList(@PathVariable String keyword, Authentication authentication) {
        return new ResponseEntity<>(reviewNoteService.findKeywordReviewNoteList(Long.parseLong(
            authentication.getName()), keyword), HttpStatus.OK);
    }

    @GetMapping("/find-scrapped")
    public ResponseEntity<List<ReviewNoteResDto>> findScrapReviewNoteList(
        Authentication authentication) {
        return new ResponseEntity<>(reviewNoteService.findScrappedReviewNoteList(Long.parseLong(
            authentication.getName())),
            HttpStatus.OK);
    }

    @PostMapping("/{reviewNoteId}/like")
    public ResponseEntity<Void> likeReviewNote(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        reviewNoteService.likeReviewNote(reviewNoteId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}/like")
    public ResponseEntity<Void> deleteLikeReviewNote(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        reviewNoteService.deleteLikeReviewNote(reviewNoteId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{reviewNoteId}/scrap")
    public ResponseEntity<Void> scrapReviewNote(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        reviewNoteService.scrapReviewNote(reviewNoteId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}/scrap")
    public ResponseEntity<Void> deleteScrapReviewNote(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        reviewNoteService.deleteScrapReviewNote(reviewNoteId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/pheed")
    public ResponseEntity<List<ReviewNoteResDto>> getPheed(Authentication authentication) {
        return new ResponseEntity<>(reviewNoteService.getPheed(Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }
}
