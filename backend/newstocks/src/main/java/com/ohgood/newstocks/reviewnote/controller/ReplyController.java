package com.ohgood.newstocks.reviewnote.controller;

import com.ohgood.newstocks.reviewnote.dto.ReplyReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyResDto;
import com.ohgood.newstocks.reviewnote.service.ReplyService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/review-note")
public class ReplyController {

    private final ReplyService replyService;

    @PostMapping("/{reviewNoteId}/reply")
    public ResponseEntity<ReplyResDto> insertReply(@PathVariable Long reviewNoteId, @RequestBody ReplyReqDto replyReqDto) {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(replyService.insertReply(replyReqDto, reviewNoteId, 5L), HttpStatus.OK);
    }

    @GetMapping("/{reviewNoteId}/reply")
    public ResponseEntity<List<ReplyResDto>> findReply(@PathVariable Long reviewNoteId) {
        // Authentication 처리 전 임시 테스트
        return new ResponseEntity<>(replyService.findReply(reviewNoteId, 5L), HttpStatus.OK);
    }

    @PatchMapping("/{reviewNoteId}/reply/{replyId}")
    public ResponseEntity<Void> updateReply(@PathVariable Long replyId, @RequestBody ReplyReqDto replyReqDto) {
        replyService.updateReply(replyReqDto, replyId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}/reply/{replyId}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long replyId) {
        replyService.deleteReply(replyId, 5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
