package com.ohgood.newstocks.reviewnote.dto;

import com.ohgood.newstocks.reviewnote.entity.NoteType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 생성, 조회, 수정을 위한 DTO입니다.
 */
@Data
@NoArgsConstructor
public class ReviewNoteReqDto {
    private Integer buyPrice;
    private Integer sellPrice;
    private Integer sellQuantity;
    private Integer buyQuantity;
    private String content;
    private LocalDateTime buyDate;
    private LocalDateTime sellDate;
    private LocalDateTime settingDate;
    private NoteType type;
    private Boolean display;
    private Boolean privacy;
    private String stockId;
    private List<Long> newsIdList;
    private List<MultipartFile> multipartFileList;

    @Builder
    public ReviewNoteReqDto(int buyPrice, int sellPrice, int sellQuantity, int buyQuantity, String content, String stockId, LocalDateTime buyDate, LocalDateTime sellDate, LocalDateTime settingDate, NoteType type, Boolean display, Boolean privacy, List<Long> newsIdList, List<MultipartFile> multipartFileList) {
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.sellQuantity = sellQuantity;
        this.buyQuantity = buyQuantity;
        this.content = content;
        this.buyDate = buyDate;
        this.sellDate = sellDate;
        this.settingDate = settingDate;
        this.type = type;
        this.stockId = stockId;
        this.display = display;
        this.privacy = privacy;
        this.newsIdList = newsIdList;
        this.multipartFileList = multipartFileList;
    }
}
