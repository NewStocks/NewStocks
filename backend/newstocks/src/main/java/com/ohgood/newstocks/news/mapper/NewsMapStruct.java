package com.ohgood.newstocks.news.mapper;

import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.dto.ValueChainNewsDto;
import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.news.entity.ValueChainNews;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NewsMapStruct {

    NewsMapStruct INSTANCE = Mappers.getMapper(NewsMapStruct.class);

    NewsDto entityToNewsDto(News news);

    ValueChainNewsDto entityToValueChainNewsDto(ValueChainNews valueChainNews);

}
