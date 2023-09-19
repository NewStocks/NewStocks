package com.ohgood.newstocks.news.service;

import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.dto.NewsResDto;
import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.repository.NewsRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsService {

    private final NewsRepository newsRepository;

    public List<NewsResDto> findAllNewsByStockId(String stockId) {
        List<News> newsList = newsRepository.findAllByStockIdOrderByPublishTimeDesc(stockId);
        List<NewsResDto> newsResList = new ArrayList<>();

        for (News news : newsList) {
            newsResList.add(NewsMapper.INSTANCE.NewsEntityToNewsResDto(news));
        }
        return newsResList;
    }

    public List<NewsResDto> findDateNewsByStockId(String stockId, String date) {
        List<News> newsList = newsRepository.findDateNewsByStockId(stockId, LocalDate.parse(date));
        List<NewsResDto> newsResList = new ArrayList<>();

        for (News news : newsList) {
            newsResList.add(NewsMapper.INSTANCE.NewsEntityToNewsResDto(news));
        }
        return newsResList;
    }

    public List<NewsDto> findAllNewsDtoByStockId(String stockId) {
        List<NewsDto> newsDtoList = new ArrayList<>();
        List<NewsResDto> newsResList = findAllNewsByStockId(stockId);
        for (NewsResDto newsResDto : newsResList) {
            newsDtoList.add(NewsMapper.INSTANCE.NewsResDtoToNewsDto(newsResDto));
        }
        return newsDtoList;
    }
}
