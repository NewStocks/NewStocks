package com.ohgood.newstocks.news.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsDto {

    private String stockId;

    private String title;

    private String company;

    private String url;

    private LocalDateTime publishTime;
}
