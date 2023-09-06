package com.ohgood.newstocks.news.service;

import com.ohgood.newstocks.news.dto.NewsResDto;
import com.ohgood.newstocks.news.entity.News;
//import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.repository.NewsRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    public List<NewsResDto> findAllNews() {
        List<News> newsList = newsRepository.findAll();
        List<NewsResDto> newsResList = new ArrayList<>();

        for (News news : newsList) {
            newsResList.add(newsMapper.NewsEntityToNewsResDto(news));
        }
        return newsResList;
    }
}
