package com.ohgood.newstocks.stock.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
public class FavoriteStockDto {

    @JsonIgnore
    private Member member;
    private String stockId;
    private String stockName;

    @Builder
    public FavoriteStockDto(Member member, String stockId, String stockName) {
        this.member = member;
        this.stockId = stockId;
        this.stockName = stockName;
    }
}
