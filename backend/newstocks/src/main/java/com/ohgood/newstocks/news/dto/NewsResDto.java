package com.ohgood.newstocks.news.dto;

import com.ohgood.newstocks.news.entity.SentimentType;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsResDto {

    private String title;

    private String stockId;

    private String company;

    private String url;

    private LocalDateTime publishTime;

    private SentimentType sentimentType;

    @Builder
    public NewsResDto(String title, String stockId, String company, String url,
        LocalDateTime publishTime, SentimentType sentimentType) {
        this.title = title;
        this.stockId = stockId;
        this.company = company;
        this.url = url;
        this.publishTime = publishTime;
        this.sentimentType = sentimentType;
    }
}
