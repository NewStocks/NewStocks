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
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String listingDate;

    @Column(nullable = false)
    private String sector;

    @Column(nullable = false)
    private String marketCap;

    @Column(nullable = false)
    private String listedShares;

    @Column(nullable = false)
    private String tradeVolume;

    @Column(nullable = false)
    private String tradeValue;

    @Column(nullable = false)
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
        String tradeVolume, String tradeValue, String foreignShares) {
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
