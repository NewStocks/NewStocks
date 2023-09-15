package com.ohgood.newstocks.notice.dto;

import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NoticeInsertReqDto {

    private String title;
    private String content;
    private List<MultipartFile> multipartFileList;
}
