package com.ohgood.newstocks.stock.dto;

import com.ohgood.newstocks.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
public class FavoriteStockDto {

    private Member member;
    private String stockId;
    private String stockName;

    @Builder
    public FavoriteStockDto(String stockId, String stockName) {
        this.stockId = stockId;
        this.stockName = stockName;
    }
}
