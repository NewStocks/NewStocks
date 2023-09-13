package com.ohgood.newstocks.notice.dto;

import com.ohgood.newstocks.notice.entity.NoticeImage;
import java.util.List;
import lombok.Data;

@Data
public class NoticeDto {

    private Long id;
    private String title;
    private String content;
    private List<NoticeImage> noticeImageList;
}
