package com.ohgood.newstocks.stock.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class StockSearchDto {

    List<StockDto> stockDtoList;

    @Builder
    public StockSearchDto(List<StockDto> stockDtoList) {
        this.stockDtoList = stockDtoList;
    }
}
