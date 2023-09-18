package com.ohgood.newstocks.notice.dto;

import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.mapper.NoticeMapper;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Data;

@Data
public class NoticeDto {

    private Long id;
    private String title;
    private String content;
    private List<NoticeImageDto> noticeImageDtoList;

    public void setNoticeImageDtoList(Notice notice) {
        this.noticeImageDtoList = notice.getNoticeImageList()
            .stream()
            .filter(noticeImage -> !noticeImage.getDeleted()) // deleted가 false인 것만 필터링
            .map(NoticeMapper.INSTANCE::entityToNoticeImageDto)
            .collect(Collectors.toList());
    }
}
