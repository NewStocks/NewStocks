package com.ohgood.newstocks.news.mapper;

import com.ohgood.newstocks.news.dto.NewsResDto;
import com.ohgood.newstocks.news.entity.News;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NewsMapper {

    public NewsResDto NewsEntityToNewsResDto(News news) {
        return NewsResDto.builder()
            .title(news.getTitle())
            .stockId(news.getStockId())
            .company(news.getCompany())
            .url(news.getUrl())
            .publishTime(news.getPublishTime())
            .build();
    }
}
