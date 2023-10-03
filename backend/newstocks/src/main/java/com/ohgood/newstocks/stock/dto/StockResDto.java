package com.ohgood.newstocks.stock.dto;

import lombok.Data;

@Data
public class StockResDto {

    private String id;
    private String name;
    private Long marketCap;
    private Long listedShares;
    private Long foreignShares;
    private double foreignPercent;
    private int stockMarket;
    private Boolean delisting;
    private String sector;
}
