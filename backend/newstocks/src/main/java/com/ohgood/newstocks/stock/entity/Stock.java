package com.ohgood.newstocks.stock.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


@Entity
@Getter
@Table
@NoArgsConstructor
public class Stock{

    @Id
    @Column
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, name = "listing_date")
    private String listingDate;

    @Column(nullable = false)
    private String sector;

    @Column(nullable = false, name = "market_cap")
    private String marketCap;

    @Column(nullable = false, name = "listed_shares")
    private String listedShares;

    @Column(nullable = false, name = "trade_volume")
    private String tradeVolume;

    @Column(nullable = false, name = "trade_value")
    private String tradeValue;

    @Column(nullable = false, name = "foreign_shares")
    private String foreignShares;

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private List<Chart> chartList;


    @Builder
    public Stock(String id, String name, String listingDate, String sector, String marketCap,
        String listedShares, String tradeVolume, String tradeValue, String foreignShares) {
        this.id = id;
        this.name = name;
        this.listingDate = listingDate;
        this.sector = sector;
        this.marketCap = marketCap;
        this.listedShares = listedShares;
        this.tradeVolume = tradeVolume;
        this.tradeValue = tradeValue;
        this.foreignShares = foreignShares;
        this.chartList = new ArrayList<>();
    }
}
