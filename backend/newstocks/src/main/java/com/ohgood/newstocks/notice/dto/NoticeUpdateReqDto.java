package com.ohgood.newstocks.notice.dto;

import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NoticeUpdateReqDto {

    private Long id;
    private String title;
    private String content;
    private List<MultipartFile> multipartFileList;
    private List<Long> deletedImageIdList;
}
