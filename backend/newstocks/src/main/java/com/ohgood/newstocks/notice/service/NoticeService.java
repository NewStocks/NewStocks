package com.ohgood.newstocks.notice.service;

import com.ohgood.newstocks.notice.dto.NoticeReqDto;
import com.ohgood.newstocks.notice.dto.NoticeResDto;
import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.repository.NoticeRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeResDto insertNotice(NoticeReqDto noticeReqDto, long l) {

        return new NoticeResDto();
    }

    public NoticeResDto findAllNotice() {
        List<Notice> noticeList = noticeRepository.findAll();

        return new NoticeResDto();
    }

    public NoticeResDto findDetailNoticeById(Long id) {
        return new NoticeResDto();
    }
}
