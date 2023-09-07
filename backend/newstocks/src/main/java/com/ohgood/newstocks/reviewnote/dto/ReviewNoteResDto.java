package com.ohgood.newstocks.reviewnote.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.NoteType;
import com.ohgood.newstocks.stock.dto.StockDto;
import com.ohgood.newstocks.stock.entity.Stock;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 생성, 조회, 수정을 위한 DTO입니다.
 */
@Data
public class ReviewNoteResDto {
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
    private StockDto stockDto;
    private MemberDto memberDto;
    private List<ReviewNoteImageDto> reviewNoteImageDtoList;

}
