package com.ohgood.newstocks.stock.dto;

import com.ohgood.newstocks.stock.entity.StockValueChain;
import java.util.List;
import lombok.Data;


@Data
public class ValueChainDto {

    private String id;
    private String ValueChainName;
    private List<StockValueChain> stockValueChainList;
}
