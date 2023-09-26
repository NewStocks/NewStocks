package com.ohgood.newstocks.reviewnote.controller;

import com.ohgood.newstocks.reviewnote.dto.ReplyCommentReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentResDto;
import com.ohgood.newstocks.reviewnote.service.ReplyCommentService;
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
@RequestMapping("/reply")
public class ReplyCommentController {

    private final ReplyCommentService replyCommentService;

    @PostMapping("/{replyId}/reply-comment")
    public ResponseEntity<ReplyCommentResDto> insertReplyComment(
        @PathVariable("replyId") Long replyId, @RequestBody ReplyCommentReqDto replyCommentReqDto) {
        return new ResponseEntity<>(
            replyCommentService.insertReplyComment(replyCommentReqDto, replyId, 6L), HttpStatus.OK);
    }

    @GetMapping("/{replyId}/reply-comment")
    public ResponseEntity<List<ReplyCommentResDto>> findReplyComment(
        @PathVariable("replyId") Long replyId) {
        return new ResponseEntity<>(replyCommentService.findReplyComment(replyId, 6L),
            HttpStatus.OK);
    }

    @PatchMapping("/{replyId}/reply-comment/{replyCommentId}")
    public ResponseEntity<List<ReplyCommentResDto>> updateReplyComment(
        @PathVariable("replyId") Long replyId,
        @PathVariable("replyCommentId") Long replyCommentId,
        @RequestBody ReplyCommentReqDto replyCommentReqDto) {
        replyCommentService.updateReplyComment(replyCommentReqDto, replyCommentId, 6L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{replyId}/reply-comment/{replyCommentId}")
    public ResponseEntity<Void> deleteReplyComment(
        @PathVariable("replyCommentId") Long replyCommentId) {
        replyCommentService.deleteReplyComment(replyCommentId, 6L);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
