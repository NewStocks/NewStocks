package com.ohgood.newstocks.reviewnote.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.reviewnote.entity.NoteType;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteImage;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLike;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLink;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteImageMapper;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteLinkMapper;
import com.ohgood.newstocks.stock.dto.StockDto;
import com.ohgood.newstocks.stock.entity.Stock;
import com.ohgood.newstocks.stock.mapper.StockMapper;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 생성, 조회, 수정을 위한 DTO입니다.
 */
@Data
public class ReviewNoteResDto {

    private Long id;
    private String title;
    private Integer buyPrice;
    private Integer sellPrice;
    private Integer sellQuantity;
    private Integer buyQuantity;
    private int scrapCount;
    private int likeCount;
    private int replyCount;
    private String content;
    private LocalDateTime buyDate;
    private LocalDateTime sellDate;
    private LocalDateTime settingDate;
    private NoteType type;
    //    private Boolean display;
    private Boolean privacy;
    private StockDto stockDto;
    private MemberDto memberDto;
    private List<ReviewNoteImageDto> reviewNoteImageDtoList = new ArrayList<>();
    private List<ReviewNoteLinkDto> reviewNoteLinkDtoList = new ArrayList<>();
    private List<NewsDto> newsDtoList = new ArrayList<>();
    private List<ReplyResDto> replyResDtoList = new ArrayList<>();

    private Boolean hasAuthority;
    private Boolean isLiked;
    private Boolean isScrapped;

    @JsonIgnore
    private Member member;
    @JsonIgnore
    private Stock stock;
    @JsonIgnore
    private List<ReviewNoteImage> reviewNoteImageList;
    @JsonIgnore
    private List<ReviewNoteLink> reviewNoteLinkList;

    public void addDetails(Member member, Stock stock) {
        this.member = member;
        this.stock = stock;
    }

    public void addDetailDtos() {
        if (this.member == null || this.stock == null) {
            throw new ArithmeticException("설정된 멤버 혹은 주식이 없습니다.");
        }
        this.memberDto = MemberMapper.INSTANCE.entityToMemberDto(this.member);
        this.stockDto = StockMapper.INSTANCE.entityToStockDto(this.stock);
        this.reviewNoteImageDtoList = this.reviewNoteImageList.stream()
            .map(ReviewNoteImageMapper.INSTANCE::entityToReviewNoteImageDto).toList();
        if (reviewNoteLinkList != null) {
            this.reviewNoteLinkDtoList = this.reviewNoteLinkList.stream()
                .map(ReviewNoteLinkMapper.INSTANCE::entityToReviewNoteLinkDto).toList();
        }
    }
//    public void checkMember(Boolean hasAuthority, Boolean isLiked, Boolean isScrapped) {this.hasAuthority = hasAuthority;
    public void checkMember(Member member) {
        this.hasAuthority = this.getMember().equals(member);
        this.isLiked = false;
        this.isScrapped = false;
    }

    public void addReply(List<ReplyResDto> replyResDtoList) {
        this.replyResDtoList = replyResDtoList;
    }
}
