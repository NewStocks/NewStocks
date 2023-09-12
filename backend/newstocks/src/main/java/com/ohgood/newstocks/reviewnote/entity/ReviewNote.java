package com.ohgood.newstocks.reviewnote.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.stock.entity.Stock;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewNote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private int likeCount;

    @NotNull
    private int scrapCount;

    @NotNull
    private Boolean privacy;

    @Column
    private LocalDateTime settingDate;

    @Column
    private LocalDateTime buyDate;

    @Column
    private LocalDateTime sellDate;

    @Column
    private Integer buyPrice;

    @Column
    private Integer sellPrice;

    @Column
    private Integer buyQuantity;

    @Column
    private Integer sellQuantity;

    @NotNull
    @Column(length = 3000)
    private String content;

    @NotNull
    @Enumerated(EnumType.STRING)
    private NoteType type;

    @NotNull
    private Boolean display;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @ToString.Exclude
    @JsonIgnore
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
    @JsonIgnore
    private Stock stock;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteNews> reviewNoteNewsList;

    @Builder
    public ReviewNote(Boolean privacy, LocalDateTime settingDate, LocalDateTime buyDate, LocalDateTime sellDate, int buyPrice, int sellPrice, int buyQuantity, int sellQuantity, String content, NoteType type, Boolean display, Member member, List<ReviewNoteImage> reviewNoteImageList, List<ReviewNoteNews> reviewNoteNewsList, Stock stock) {
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
        this.content = content;
        this.type = type;
        this.display = display;
        this.member = member;
        this.reviewNoteImageList = new ArrayList<>();
        this.replyList = new ArrayList<>();
        this.reviewNoteNewsList = new ArrayList<>();
        this.stock = stock;
    }
}
