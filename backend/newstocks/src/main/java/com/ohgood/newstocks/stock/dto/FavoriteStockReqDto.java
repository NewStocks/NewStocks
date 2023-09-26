package com.ohgood.newstocks.stock.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FavoriteStockReqDto {

    private String stockId;
    private String stockName;

    @Builder
    public FavoriteStockReqDto(String stockId, String stockName) {
        this.stockId = stockId;
        this.stockName = stockName;
    }
}
