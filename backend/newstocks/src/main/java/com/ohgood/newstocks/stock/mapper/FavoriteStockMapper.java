package com.ohgood.newstocks.stock.mapper;

import com.ohgood.newstocks.stock.dto.FavoriteStockDto;
import com.ohgood.newstocks.stock.dto.FavoriteStockReqDto;
import com.ohgood.newstocks.stock.entity.FavoriteStock;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FavoriteStockMapper {

    FavoriteStockMapper INSTANCE= Mappers.getMapper(FavoriteStockMapper.class);

    FavoriteStock FavoriteStockDtoToEntity(FavoriteStockDto favoriteStockDto);
    FavoriteStockDto FavoriteStockReqDtoToFavoriteStockDto(FavoriteStockReqDto favoriteStockReqDto);

    FavoriteStockDto entityToFavoriteStockDto(FavoriteStock favoriteStock);
}
