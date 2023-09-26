package com.ohgood.newstocks.reviewnote.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import lombok.Data;

@Data
public class ReplyResDto {

    private Long id;
    private String content;
    private MemberDto memberDto;
    private Integer likeCount;

    private Boolean hasAuthority;
    private Boolean isLiked;


    @JsonIgnore
    private ReviewNote reviewNote;
    @JsonIgnore
    private Member member;

    public void addDetails(Member member, ReviewNote reviewNote) {
        this.member = member;
        this.reviewNote = reviewNote;
    }

    public void addDetailDtos() {
        if (this.member == null) {
            throw new ArithmeticException("설정된 멤버가 없습니다.");
        }
        this.memberDto = MemberMapper.INSTANCE.entityToMemberDto(this.member);
    }

    public void checkMemberAndIsLiked(Member member, Boolean isLiked) {
        this.hasAuthority = this.getMember().equals(member);
        this.isLiked = isLiked;
    }
}
