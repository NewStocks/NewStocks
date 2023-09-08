package com.ohgood.newstocks.news.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ValueChainNews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    private String valueChainName;

    @NotNull
    private String title;

    @NotNull
    private String company;

    @NotNull
    private String url;

    @NotNull
    private LocalDateTime publishTime;

    @Builder
    public ValueChainNews(@NotNull String valueChainName, @NotNull String title,
        @NotNull String company, @NotNull String url, @NotNull LocalDateTime publishTime) {
        this.valueChainName = valueChainName;
        this.title = title;
        this.company = company;
        this.url = url;
        this.publishTime = publishTime;
    }
}
