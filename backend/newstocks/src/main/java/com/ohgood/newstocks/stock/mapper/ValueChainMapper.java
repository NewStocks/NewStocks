package com.ohgood.newstocks.stock.mapper;

import com.ohgood.newstocks.stock.dto.ValueChainResDto;
import com.ohgood.newstocks.stock.entity.ValueChain;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ValueChainMapper {

    ValueChainMapper INSTANCE = Mappers.getMapper(ValueChainMapper.class);

    ValueChainResDto valueChainToValueChainResDto(ValueChain valueChain);
}
