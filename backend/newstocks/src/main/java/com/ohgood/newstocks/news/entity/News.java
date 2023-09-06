package com.ohgood.newstocks.news.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private LocalDateTime publishTime;

    @Column(nullable = false)
    private String stockId;

//    Stock Entity가 생기면 아래로 수정 예정
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "stock_id")
//    private Stock stock;

    @Builder
    public News(Long id, String title, String company, String url, LocalDateTime publishTime,
        String stockId) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.url = url;
        this.publishTime = publishTime;
        this.stockId = stockId;
    }
}
