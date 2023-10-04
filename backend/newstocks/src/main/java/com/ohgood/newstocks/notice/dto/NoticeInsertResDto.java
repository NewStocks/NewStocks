package com.ohgood.newstocks.notice.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class NoticeInsertResDto {

    private Long id;
    private String title;
    private String content;
    private List<NoticeImageDto> noticeImageDtoList;

    public void setNoticeImageDtoList(
        List<NoticeImageDto> noticeImageDtoList) {
        this.noticeImageDtoList = noticeImageDtoList;
    }

    @Builder
    public NoticeInsertResDto(Long id, String title, String content) {
        this.id=id;
        this.title = title;
        this.content = content;
        this.noticeImageDtoList = new ArrayList<>();
    }
}
