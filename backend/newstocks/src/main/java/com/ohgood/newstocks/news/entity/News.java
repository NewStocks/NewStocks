package com.ohgood.newstocks.news.entity;

import com.ohgood.newstocks.stock.entity.Stock;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String company;

    @NotNull
    private String url;

    @NotNull
    private LocalDateTime publishTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    @NotNull
    private Stock stock;

    @Builder
    public News(@NotNull String title, @NotNull String company, @NotNull String url,
        @NotNull LocalDateTime publishTime, @NotNull Stock stock) {
        this.title = title;
        this.company = company;
        this.url = url;
        this.publishTime = publishTime;
        this.stock = stock;
    }
}