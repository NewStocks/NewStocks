package com.ohgood.newstocks.stock.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockValueChain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "value_chain_id")
    private ValueChain valueChain;

    @Builder
    public StockValueChain(Stock stock, ValueChain valueChain) {
        this.stock = stock;
        this.valueChain = valueChain;
    }
}
