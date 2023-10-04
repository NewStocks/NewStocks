package com.ohgood.newstocks.stock.mapper;

import com.ohgood.newstocks.stock.dto.StockDto;
import com.ohgood.newstocks.stock.dto.StockResDto;
import com.ohgood.newstocks.stock.entity.Stock;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StockMapper {

    StockMapper INSTANCE = Mappers.getMapper(StockMapper.class);

    StockDto entityToStockDto(Stock stock);

    StockResDto entityToStockResDto(Stock stock);
}
