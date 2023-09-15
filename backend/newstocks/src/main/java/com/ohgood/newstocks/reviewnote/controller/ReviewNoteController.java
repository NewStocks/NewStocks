package com.ohgood.newstocks.reviewnote.controller;

import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteUpdateReqDto;
import com.ohgood.newstocks.reviewnote.service.ReviewNoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/review-note")
public class ReviewNoteController {

    private final ReviewNoteService reviewNoteService;

    @PostMapping
    public ResponseEntity<ReviewNoteResDto> insertReviewNote(@ModelAttribute ReviewNoteReqDto reviewNoteReqDto) {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.insertReviewNote(reviewNoteReqDto, 5L), HttpStatus.OK);
    }

    @GetMapping("/{reviewNoteId}")
    public ResponseEntity<ReviewNoteResDto> findReviewNote(@PathVariable Long reviewNoteId) {
        return new ResponseEntity<>(reviewNoteService.findReviewNote(reviewNoteId), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<ReviewNoteResDto> updateReviewNote(ReviewNoteUpdateReqDto reviewNoteUpdateReqDto) {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.updateReviewNote(reviewNoteUpdateReqDto, 5L), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}")
    public ResponseEntity<Void> deleteReviewNote(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        reviewNoteService.deleteReviewNote(reviewNoteId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
