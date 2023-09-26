package com.ohgood.newstocks.reviewnote.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ReplyCommentResDto {

    private Long id;
    private String content;
    private MemberDto memberDto;
    private Integer likeCount;

    private Boolean hasAuthority;
    private Boolean isLiked;

    @JsonIgnore
    private Reply reply;
    @JsonIgnore
    private Member member;

    public void addDetails(Member member, Reply reply) {
        this.member = member;
        this.reply = reply;
    }

    public void addDetailDtos() {
        if (this.member == null) {
            throw new BadRequestException("설정된 멤버가 없습니다.");
        }
        this.memberDto = MemberMapper.INSTANCE.entityToMemberDto(this.member);
    }

    public void checkMember(Member member) {
        this.hasAuthority = this.getMember().equals(member);
        this.isLiked = false;
    }
}
