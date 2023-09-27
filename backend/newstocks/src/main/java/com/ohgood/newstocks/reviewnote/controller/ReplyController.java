package com.ohgood.newstocks.reviewnote.controller;

import com.ohgood.newstocks.reviewnote.dto.ReplyReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyResDto;
import com.ohgood.newstocks.reviewnote.service.ReplyService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
// TODO Authentication 처리 필요
public class ReplyController {

    private final ReplyService replyService;

    @PostMapping("/{reviewNoteId}/reply")
    public ResponseEntity<ReplyResDto> insertReply(@PathVariable Long reviewNoteId,
        @RequestBody ReplyReqDto replyReqDto, Authentication authentication) {
        return new ResponseEntity<>(
            replyService.insertReply(replyReqDto, reviewNoteId, Long.parseLong(
                authentication.getName())),
            HttpStatus.OK);
    }

    @GetMapping("/{reviewNoteId}/reply")
    public ResponseEntity<List<ReplyResDto>> findReply(@PathVariable Long reviewNoteId,
        Authentication authentication) {
        return new ResponseEntity<>(replyService.findReply(reviewNoteId, Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @PatchMapping("/{reviewNoteId}/reply/{replyId}")
    public ResponseEntity<Void> updateReply(@PathVariable Long replyId,
        @RequestBody ReplyReqDto replyReqDto, Authentication authentication) {
        replyService.updateReply(replyReqDto, replyId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewNoteId}/reply/{replyId}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long replyId,
        Authentication authentication) {
        replyService.deleteReply(replyId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reply/{replyId}/like")
    public ResponseEntity<Void> likeReply(@PathVariable("replyId") Long replyId,
        Authentication authentication) {
        replyService.likeReply(replyId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/reply/{replyId}/like")
    public ResponseEntity<Void> deleteLikeReply(@PathVariable("replyId") Long replyId,
        Authentication authentication) {
        replyService.deleteLikeReply(replyId, Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
