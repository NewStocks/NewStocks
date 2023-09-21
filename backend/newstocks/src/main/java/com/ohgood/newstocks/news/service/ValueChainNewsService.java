package com.ohgood.newstocks.news.service;

import com.ohgood.newstocks.news.dto.ValueChainNewsDto;
import com.ohgood.newstocks.news.entity.ValueChainNews;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.repository.ValueChainNewsRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ValueChainNewsService {

    private final ValueChainNewsRepository valueChainNewsRepository;

    public List<ValueChainNewsDto> findAllByStockId(String stockId) {
        List<ValueChainNews> valueChainNewsList = valueChainNewsRepository.findAllByStockId(
            stockId);
        List<ValueChainNewsDto> valueChainNewsDtoList = new ArrayList<>();

        for (ValueChainNews valueChainNews : valueChainNewsList) {
            valueChainNewsDtoList.add(
                NewsMapper.INSTANCE.entityToValueChainNewsDto(valueChainNews));
        }

        return valueChainNewsDtoList;
    }

    public List<ValueChainNewsDto> findDateNewsByStockId(String stockId, String date) {
        List<ValueChainNews> valueChainNewsList = valueChainNewsRepository.findDateNewsByStockId(
            stockId, LocalDate.parse(date));
        List<ValueChainNewsDto> valueChainNewsDtoList = new ArrayList<>();

        for (ValueChainNews valueChainNews : valueChainNewsList) {
            valueChainNewsDtoList.add(
                NewsMapper.INSTANCE.entityToValueChainNewsDto(valueChainNews));
        }

        return valueChainNewsDtoList;
    }
}