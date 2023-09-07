package com.ohgood.newstocks.reviewnote.controller;

import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.service.ReviewNoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/review-note")
public class ReviewNoteController {

    private final ReviewNoteService reviewNoteService;

    @PostMapping
    public ResponseEntity<ReviewNoteResDto> insertReviewNote(@RequestBody ReviewNoteReqDto reviewNoteReqDto) {

        log.info("" + reviewNoteReqDto);
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(reviewNoteService.insertReviewNote(reviewNoteReqDto, 5L), HttpStatus.OK);
    }

}
