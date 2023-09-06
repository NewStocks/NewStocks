package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.stock.entity.Stock;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewNote extends BaseTimeEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int likeCount;

    @Column(nullable = false)
    private int scrapCount;

    @Column(nullable = false)
    private Boolean privacy;

    @Column
    private LocalDateTime settingDate;

    @Column
    private LocalDateTime buyDate;

    @Column
    private LocalDateTime sellDate;

    @Column
    private int buyPrice;

    @Column
    private int sellPrice;

    @Column
    private int buyQuantity;

    @Column
    private int sellQuantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NoteType type;

    @Column(nullable = false)
    private Boolean display;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @ToString.Exclude
    private Member member;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteImage> reviewNoteImageList;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<Reply> replyList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    @ToString.Exclude
    private Stock stock;

    @Builder
    public ReviewNote(Boolean privacy, LocalDateTime settingDate, LocalDateTime buyDate, LocalDateTime sellDate, int buyPrice, int sellPrice, int buyQuantity, int sellQuantity, NoteType type, Boolean display, Member member, List<ReviewNoteImage> reviewNoteImageList, Stock stock) {
        this.likeCount = 0;
        this.scrapCount = 0;
        this.privacy = privacy;
        this.settingDate = settingDate;
        this.buyDate = buyDate;
        this.sellDate = sellDate;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.buyQuantity = buyQuantity;
        this.sellQuantity = sellQuantity;
        this.type = type;
        this.display = display;
        this.member = member;
        this.reviewNoteImageList = reviewNoteImageList;
        this.replyList = new ArrayList<>();
        this.stock = stock;
    }
}
