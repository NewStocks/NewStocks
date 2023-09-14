package com.ohgood.newstocks.notice.service;

import com.ohgood.newstocks.notice.dto.NoticeDto;
import com.ohgood.newstocks.notice.dto.NoticeReqDto;
import com.ohgood.newstocks.notice.dto.NoticeResDto;
import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.mapper.NoticeMapper;
import com.ohgood.newstocks.notice.repository.NoticeRepository;
import java.util.ArrayList;
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

        return NoticeResDto.builder().build();
    }

    public NoticeResDto findAllNotice() {
        List<Notice> noticeList = noticeRepository.findAll();
        List<NoticeDto> noticeDtoList = new ArrayList<>();
        for(Notice notice: noticeList){
            NoticeDto noticeDto = NoticeMapper.INSTANCE.entityToNoticeDto(notice);
            noticeDto.setNoticeImageDtoList(notice);
            noticeDtoList.add(noticeDto);
        }
        return NoticeResDto.builder().noticeDtoList(noticeDtoList).build();
    }

    public NoticeResDto findDetailNoticeById(Long id) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> new ArithmeticException("해당하는 공지사항이 없습니다."));
        List<NoticeDto> noticeDtoList = new ArrayList<>();
        NoticeDto noticeDto = NoticeMapper.INSTANCE.entityToNoticeDto(notice);
        noticeDto.setNoticeImageDtoList(notice);
        System.out.println(noticeDto);
        noticeDtoList.add(noticeDto);
        return NoticeResDto.builder().noticeDtoList(noticeDtoList).build();
    }
}
