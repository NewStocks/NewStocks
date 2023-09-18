package com.ohgood.newstocks.notice.controller;

import com.ohgood.newstocks.notice.dto.NoticeInsertReqDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertResDto;
import com.ohgood.newstocks.notice.dto.NoticeResDto;
import com.ohgood.newstocks.notice.dto.NoticeUpdateReqDto;
import com.ohgood.newstocks.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/insert")
    public ResponseEntity<NoticeInsertResDto> insertNotice(
        @ModelAttribute NoticeInsertReqDto noticeInsertReqDto, @RequestParam Long memberId) {
        return new ResponseEntity<>(noticeService.insertNotice(noticeInsertReqDto, 5L),
            HttpStatus.OK);
    }

    @GetMapping("/find-all")
    public ResponseEntity<NoticeResDto> findAllNotice() {
        return new ResponseEntity<>(noticeService.findAllNotice(), HttpStatus.OK);
    }

    @GetMapping("/find-detail/{id}")
    public ResponseEntity<NoticeResDto> findDetailNoticeById(@PathVariable Long id) {
        System.out.println(id);
        return new ResponseEntity<>(noticeService.findDetailNoticeById(id), HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<NoticeInsertResDto> updateNotice(@PathVariable Long id,
        @ModelAttribute NoticeUpdateReqDto noticeUpdateReqDto, @RequestParam Long memberId) {
        return new ResponseEntity<>(noticeService.updateNotice(noticeUpdateReqDto, id, 5L),
            HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotice(@PathVariable Long id, @RequestParam Long memberId) {
        return new ResponseEntity<>(noticeService.deleteNotice(id, 5L), HttpStatus.OK);
    }
}
