package com.ohgood.newstocks.stock.entity;


import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table
@NoArgsConstructor
public class Chart{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GraphType graphType;

    @Column(nullable = false, name = "start_price")
    private int startPrice;

    @Column(nullable = false, name = "end_price")
    private int endPrice;

    @Column(nullable = false, name = "high_price")
    private int highPrice;

    @Column(nullable = false, name = "low_price")
    private int lowPrice;

    @Column(nullable = false, name = "date")
    private LocalDate date;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="stock_id")
    private Stock stock;

    @Builder
    public Chart(GraphType graphType, int startPrice, int endPrice, int highPrice, int lowPrice,
        LocalDate date, Stock stock) {
        this.graphType = graphType;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.date = date;
        this.stock = stock;
    }
}
