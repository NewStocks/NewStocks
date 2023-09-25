package com.ohgood.newstocks.stock.entity;

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
public class ValueChain {

    @Id
    private String id;

    @NotNull
    private String ValueChainName;

    @OneToMany(mappedBy = "valueChain")
    @Fetch(FetchMode.JOIN)
    private List<StockValueChain> stockValueChainList;

    @Builder
    public ValueChain(String id, @NotNull String valueChainName) {
        this.id = id;
        ValueChainName = valueChainName;
        this.stockValueChainList = new ArrayList<>();
    }
}
