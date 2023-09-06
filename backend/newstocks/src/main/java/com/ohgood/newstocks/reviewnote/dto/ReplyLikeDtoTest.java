package com.ohgood.newstocks.reviewnote.dto;

import com.ohgood.newstocks.member.entity.Member;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReplyLikeDtoTest {
    private Long id;
    private Member member;

    @Builder
    public ReplyLikeDtoTest(Long id, Member member) {
        this.id = id;
        this.member = member;
    }
}
