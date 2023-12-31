package com.ohgood.newstocks.reviewnote.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteUpdateReqDto;
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
    private String title;

    @NotNull
    private int likeCount;

    @NotNull
    private int scrapCount;

    @NotNull
    private int replyCount;

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


    // 실제 사용하지 않기로 함
    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteNews> reviewNoteNewsList;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteLink> reviewNoteLinkList;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteLike> reviewNoteLikeList;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteScrap> reviewNoteScrapList;

    @Builder
    public ReviewNote(String title, Boolean privacy, LocalDateTime settingDate,
        LocalDateTime buyDate, LocalDateTime sellDate, int buyPrice, int sellPrice, int buyQuantity,
        int sellQuantity, String content, NoteType type, Member member,
        Stock stock) {
        this.title = title;
        this.likeCount = 0;
        this.scrapCount = 0;
        this.replyCount = 0;
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
        this.display = true;
        this.member = member;
        this.reviewNoteImageList = new ArrayList<>();
        this.replyList = new ArrayList<>();
        this.reviewNoteNewsList = new ArrayList<>();
        this.reviewNoteLinkList = new ArrayList<>();
        this.stock = stock;
    }

    public void updateReviewNoteLink(List<ReviewNoteLink> reviewNoteLinkList) {
        this.reviewNoteLinkList = reviewNoteLinkList;
    }

    public void increaseLikeCount() {
        this.likeCount++;
    }

    public void decreaseLikeCount() {
        this.likeCount--;
    }

    public void increaseScrapCount() {
        this.scrapCount++;
    }

    public void decreaseScrapCount() {
        this.scrapCount--;
    }

    public void increaseReplyCount() {
        this.replyCount++;
    }

    public void decreaseReplyCount() {
        this.replyCount--;
    }

    public void updateReviewNote(ReviewNoteUpdateReqDto updateDto) {
        this.title = updateDto.getTitle() == null ? this.title : updateDto.getTitle();
        this.content = updateDto.getContent() == null ? this.content : updateDto.getContent();
        this.buyDate = updateDto.getBuyDate() == null ? this.buyDate : updateDto.getBuyDate();
        this.sellDate = updateDto.getSellDate() == null ? this.sellDate : updateDto.getSellDate();
        this.buyPrice = updateDto.getBuyPrice() == null ? this.buyPrice : updateDto.getBuyPrice();
        this.sellPrice = updateDto.getSellPrice() == null ? this.sellPrice : updateDto.getSellPrice();
        this.buyQuantity = updateDto.getBuyQuantity() == null ? this.buyQuantity : updateDto.getBuyQuantity();
        this.sellQuantity = updateDto.getSellQuantity() == null ? this.sellQuantity : updateDto.getSellQuantity();
        this.settingDate = updateDto.getSettingDate() == null ? this.settingDate : updateDto.getSettingDate();
        this.privacy = updateDto.getPrivacy() == null ? this.privacy : updateDto.getPrivacy();
        this.type = updateDto.getType() == null ? this.type : updateDto.getType();
    }
}
