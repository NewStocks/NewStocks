package com.ohgood.newstocks.notice.service;

import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.notice.dto.NoticeDto;
import com.ohgood.newstocks.notice.dto.NoticeImageDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertReqDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertResDto;
import com.ohgood.newstocks.notice.dto.NoticeResDto;
import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.entity.NoticeImage;
import com.ohgood.newstocks.notice.mapper.NoticeImageMapper;
import com.ohgood.newstocks.notice.mapper.NoticeMapper;
import com.ohgood.newstocks.notice.repository.NoticeImageRepository;
import com.ohgood.newstocks.notice.repository.NoticeRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeImageRepository noticeImageRepository;
    private final AwsS3Service awsS3Service;

    @Transactional
    public NoticeInsertResDto insertNotice(NoticeInsertReqDto noticeInsertReqDto, long l) {
        Notice notice = NoticeMapper.INSTANCE.noticeReqDtoToEntity(noticeInsertReqDto);
        noticeRepository.save(notice);
        return getNoticeInsertResDto(noticeInsertReqDto, notice);
    }

    @Transactional
    public NoticeInsertResDto updateNotice(NoticeInsertReqDto noticeInsertReqDto, Long id) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new ArithmeticException("수정하려는 공지사항이 없습니다."));
        System.out.println(notice.toString());
        notice.updateNotice(noticeInsertReqDto);
        return getNoticeInsertResDto(noticeInsertReqDto, notice);
    }

    private NoticeInsertResDto getNoticeInsertResDto(NoticeInsertReqDto noticeInsertReqDto,
        Notice notice) {
        List<NoticeImage> beforeNoticeImageList = notice.getNoticeImageList();
        for (NoticeImage noticeImage : beforeNoticeImageList) {
            noticeImage.delete();
        }
        List<NoticeImageDto> noticeImageDtoList = new ArrayList<>();
        if (noticeInsertReqDto.getMultipartFileList() != null) {
            for (MultipartFile multipartFile : noticeInsertReqDto.getMultipartFileList()) {
                String url = awsS3Service.uploadFile("/notice", multipartFile);
                NoticeImage noticeImage = NoticeImage.builder().url(url).notice(notice).build();
                NoticeImageDto noticeImageDto = NoticeImageMapper.INSTANCE.entityToNoticeImageDto(
                    noticeImage);
                noticeImageRepository.save(noticeImage);
                noticeImageDtoList.add(noticeImageDto);
                notice.getNoticeImageList().add(noticeImage);
            }
        }
        NoticeInsertResDto noticeInsertResDto = NoticeMapper.INSTANCE.entityToNoticeInsertResDto(
            notice);
        noticeInsertResDto.setNoticeImageDtoList(noticeImageDtoList);
        return noticeInsertResDto;
    }

    public NoticeResDto findAllNotice() {
        List<Notice> noticeList = noticeRepository.findByDeletedFalse();
        List<NoticeDto> noticeDtoList = new ArrayList<>();
        for (Notice notice : noticeList) {
            NoticeDto noticeDto = NoticeMapper.INSTANCE.entityToNoticeDto(notice);
            noticeDto.setNoticeImageDtoList(notice);
            noticeDtoList.add(noticeDto);
        }
        return NoticeResDto.builder().noticeDtoList(noticeDtoList).build();
    }

    public NoticeResDto findDetailNoticeById(Long id) {
        Notice notice = noticeRepository.findByIdAndDeletedFalse(id)
            .orElseThrow(() -> new ArithmeticException("해당하는 공지사항이 없습니다."));
        List<NoticeDto> noticeDtoList = new ArrayList<>();
        NoticeDto noticeDto = NoticeMapper.INSTANCE.entityToNoticeDto(notice);
        noticeDto.setNoticeImageDtoList(notice);
        System.out.println(noticeDto);
        noticeDtoList.add(noticeDto);
        return NoticeResDto.builder().noticeDtoList(noticeDtoList).build();
    }

    @Transactional
    public String deleteNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new ArithmeticException("삭제하려는 공지사항이 존재하지 않습니다."));
        notice.delete();
        return "deleted successfully";
    }
}
