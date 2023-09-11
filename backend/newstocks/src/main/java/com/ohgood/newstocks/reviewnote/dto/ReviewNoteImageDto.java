package com.ohgood.newstocks.reviewnote.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class ReviewNoteImageDto {

    private Long id;
    private String url;

    @Builder
    public ReviewNoteImageDto(Long id, String url) {
        this.id = id;
        this.url = url;
    }
}
