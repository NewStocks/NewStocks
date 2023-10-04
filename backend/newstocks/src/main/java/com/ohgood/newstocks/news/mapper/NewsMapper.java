package com.ohgood.newstocks.news.mapper;

import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.dto.NewsResDto;
import com.ohgood.newstocks.news.dto.ValueChainNewsDto;
import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.news.entity.ValueChainNews;
import com.ohgood.newstocks.stock.dto.DataDto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NewsMapper {

    NewsMapper INSTANCE = Mappers.getMapper(NewsMapper.class);

    NewsDto entityToNewsDto(News news);

    ValueChainNewsDto entityToValueChainNewsDto(ValueChainNews valueChainNews);

    @Mapping(target = "stockId", source = "stock.id")
    NewsResDto NewsEntityToNewsResDto(News news);

    NewsDto NewsResDtoToNewsDto(NewsResDto newsResDto);

    @Mapping(target = "x", source = "publishTime", qualifiedByName = "localDateTimeToLocalDate")
    @Mapping(target = "y", expression = "java(mapNews(newsDto))")
    DataDto NewsDtoToDataDto(NewsDto newsDto);

    @Named("localDateTimeToLocalDate")
    default LocalDate mapLocalDateTimeToLocalDate(LocalDateTime localDateTime) {
        if (localDateTime != null) {
            return localDateTime.toLocalDate();
        } else {
            return null;
        }
    }

    default List<Object> mapNews(NewsDto newsDto) {
        List<Object> newsDetailList = new ArrayList<>();
        newsDetailList.add(newsDto.getTitle());
        newsDetailList.add(newsDto.getStockId());
        newsDetailList.add(newsDto.getTitle());
        newsDetailList.add(newsDto.getUrl());
        return newsDetailList;
    }
}
