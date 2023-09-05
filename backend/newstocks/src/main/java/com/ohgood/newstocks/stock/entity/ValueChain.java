package com.ohgood.newstocks.stock.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@Entity
@Table
@NoArgsConstructor
public class ValueChain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ValueChainName;

    @OneToMany(mappedBy = "valueChain")
    @Fetch(FetchMode.JOIN)
    private List<StockValueChain> stockValueChainList;

    @Builder
    public ValueChain(String valueChainName) {
        ValueChainName = valueChainName;
        this.stockValueChainList = new ArrayList<>();
    }
}
