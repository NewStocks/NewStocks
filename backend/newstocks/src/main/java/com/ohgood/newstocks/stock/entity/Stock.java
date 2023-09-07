package com.ohgood.newstocks.stock.entity;

import com.ohgood.newstocks.news.entity.News;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stock {

    @Id
    private String id;

    @NotNull
    private String name;

    @NotNull
    private Long marketCap;

    @NotNull
    private Long listedShares;

    @NotNull
    private Long foreignShares;

    @NotNull
    private double foreignPercent;

    @NotNull
    private Boolean delisting;

    @NotNull
    private String sector;

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

    @OneToMany(mappedBy = "stock", fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private List<StockCategory> stockCategoryList;

    @Builder
    public Stock(String id, @NotNull String name, @NotNull Long marketCap,
        @NotNull Long listedShares, @NotNull Long foreignShares, @NotNull double foreignPercent,
        @NotNull Boolean delisting, @NotNull String sector) {
        this.id = id;
        this.name = name;
        this.marketCap = marketCap;
        this.listedShares = listedShares;
        this.foreignShares = foreignShares;
        this.foreignPercent = foreignPercent;
        this.delisting = delisting;
        this.sector = sector;
        this.chartList = new ArrayList<>();
        this.stockValueChainList = new ArrayList<>();
        this.reviewNoteList = new ArrayList<>();
        this.newsList = new ArrayList<>();
        this.stockCategoryList = new ArrayList<>();
    }
}
