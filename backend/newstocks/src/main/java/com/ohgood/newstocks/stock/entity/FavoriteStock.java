package com.ohgood.newstocks.stock.entity;

import com.ohgood.newstocks.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String stockId;

    @NotNull
    private String stockName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public FavoriteStock(@NotNull String stockId, @NotNull String stockName, Member member) {
        this.stockId = stockId;
        this.stockName = stockName;
        this.member = member;
    }
}
