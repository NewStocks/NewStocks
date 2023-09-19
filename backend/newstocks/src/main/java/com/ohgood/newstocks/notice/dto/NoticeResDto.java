package com.ohgood.newstocks.notice.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class NoticeResDto {

    private List<NoticeDto> noticeDtoList;

    @Builder
    public NoticeResDto(List<NoticeDto> noticeDtoList) {
        this.noticeDtoList = noticeDtoList;
    }
}
