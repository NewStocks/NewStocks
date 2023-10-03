package com.ohgood.newstocks.member.dto;

import com.ohgood.newstocks.stock.entity.FavoriteStock;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class MemberLoginDto {

    private MemberDto memberDto;
    private String accessToken;
    private List<FavoriteStock> favoriteStockList;

    @Builder
    public MemberLoginDto(MemberDto memberDto, List<FavoriteStock> favoriteStockList, String accessToken) {
        this.memberDto = memberDto;
        this.favoriteStockList = favoriteStockList;
        this.accessToken=accessToken;
    }
}
