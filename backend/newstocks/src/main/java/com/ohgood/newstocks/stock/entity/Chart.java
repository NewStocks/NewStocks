package com.ohgood.newstocks.stock.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private int startPrice;

    @NotNull
    private int endPrice;

    @NotNull
    private int highPrice;

    @NotNull
    private int lowPrice;

    @NotNull
    private LocalDate date;

    @NotNull
    private Long volume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @Builder
    public Chart(@NotNull int startPrice, @NotNull int endPrice, @NotNull int highPrice,
        @NotNull int lowPrice, @NotNull LocalDate date, @NotNull Long volume, Stock stock) {
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.date = date;
        this.volume = volume;
        this.stock = stock;
    }
}
