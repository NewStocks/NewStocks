package com.ohgood.newstocks.reviewnote.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class ReviewNoteLinkDto {

    private Long id;
    private String url;

    @Builder
    public ReviewNoteLinkDto(Long id, String url) {
    }
}
