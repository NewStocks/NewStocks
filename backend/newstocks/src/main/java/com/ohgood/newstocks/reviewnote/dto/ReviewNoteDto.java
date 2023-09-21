package com.ohgood.newstocks.reviewnote.dto;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.NoteType;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteImage;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteNews;
import com.ohgood.newstocks.stock.dto.DataDto;
import com.ohgood.newstocks.stock.entity.Stock;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class ReviewNoteDto extends DataDto {

    private Long id;
    private String title;
    private int likeCount;
    private int scrapCount;
    private Boolean privacy;
    private LocalDateTime settingDate;
    private LocalDateTime buyDate;
    private LocalDateTime sellDate;
    private Integer buyPrice;
    private Integer sellPrice;
    private Integer buyQuantity;
    private Integer sellQuantity;
    private String content;
    private NoteType type;
    private Boolean display;
    private Member member;
    private List<ReviewNoteImage> reviewNoteImageList;
    private List<Reply> replyList;
    private Stock stock;
    private List<ReviewNoteNews> reviewNoteNewsList;

    @Builder
    public ReviewNoteDto(Long id, String title, int likeCount, int scrapCount, Boolean privacy,
        LocalDateTime settingDate,
        LocalDateTime buyDate, LocalDateTime sellDate, Integer buyPrice, Integer sellPrice,
        Integer buyQuantity, Integer sellQuantity, String content, NoteType type, Boolean display,
        Member member, List<ReviewNoteImage> reviewNoteImageList, List<Reply> replyList,
        Stock stock,
        List<ReviewNoteNews> reviewNoteNewsList) {
        this.id = id;
        this.title = title;
        this.likeCount = likeCount;
        this.scrapCount = scrapCount;
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
        this.reviewNoteImageList = reviewNoteImageList;
        this.replyList = replyList;
        this.stock = stock;
        this.reviewNoteNewsList = reviewNoteNewsList;
    }
}
