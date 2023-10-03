package com.ohgood.newstocks.news.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ValueChainNewsDto {

    private String valueChainId;

    private String valueChainName;

    private String title;

    private String company;

    private String url;

    private LocalDateTime publishTime;
}
