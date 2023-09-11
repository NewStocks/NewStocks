package com.ohgood.newstocks.news.service;

import com.ohgood.newstocks.news.dto.ValueChainNewsDto;
import com.ohgood.newstocks.news.entity.ValueChainNews;
import com.ohgood.newstocks.news.mapper.NewsMapStruct;
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

    public List<ValueChainNewsDto> findAllByValueChainId(String valueChainId) {
        List<ValueChainNews> valueChainNewsList = valueChainNewsRepository.findAllByValueChainIdOrderByPublishTimeDesc(
            valueChainId);
        List<ValueChainNewsDto> valueChainNewsDtoList = new ArrayList<>();

        for (ValueChainNews valueChainNews : valueChainNewsList) {
            valueChainNewsDtoList.add(
                NewsMapStruct.INSTANCE.entityToValueChainNewsDto(valueChainNews));
        }

        return valueChainNewsDtoList;
    }

    public List<ValueChainNewsDto> findDateNewsByValueChainId(String valueChainId, String date) {
        List<ValueChainNews> valueChainNewsList = valueChainNewsRepository.findDateNewsByValueChainId(
            valueChainId, LocalDate.parse(date));
        List<ValueChainNewsDto> valueChainNewsDtoList = new ArrayList<>();

        for (ValueChainNews valueChainNews : valueChainNewsList) {
            valueChainNewsDtoList.add(
                NewsMapStruct.INSTANCE.entityToValueChainNewsDto(valueChainNews));
        }

        return valueChainNewsDtoList;
    }
}
