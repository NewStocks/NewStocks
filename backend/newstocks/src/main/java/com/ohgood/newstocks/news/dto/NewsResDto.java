package com.ohgood.newstocks.news.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsResDto {

    private String title;

    private String stockId;

    private String company;

    private String url;

    private LocalDateTime publishTime;

    @Builder
    public NewsResDto(String title, String stockId, String company, String url,
        LocalDateTime publishTime) {
        this.title = title;
        this.stockId = stockId;
        this.company = company;
        this.url = url;
        this.publishTime = publishTime;
    }
}
