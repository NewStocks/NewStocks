package com.ohgood.newstocks.stock.entity;

import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
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

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private List<StockValueChain> stockValueChainList;

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private List<ReviewNote> reviewNoteList;

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private List<News> newsList;

    @Builder
    public Stock(String name, String listingDate, String sector, String marketCap,
        String listedShares,
        String tradeVolume, String tradeValue, String foreignShares, List<Chart> chartList,
        List<StockValueChain> stockValueChainList, List<ReviewNote> reviewNoteList,
        List<News> newsList) {
        this.name = name;
        this.listingDate = listingDate;
        this.sector = sector;
        this.marketCap = marketCap;
        this.listedShares = listedShares;
        this.tradeVolume = tradeVolume;
        this.tradeValue = tradeValue;
        this.foreignShares = foreignShares;
        this.chartList = new ArrayList<>();
        this.stockValueChainList = new ArrayList<>();
        this.reviewNoteList = new ArrayList<>();
        this.newsList = new ArrayList<>();
    }
}
