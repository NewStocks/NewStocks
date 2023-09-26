package com.ohgood.newstocks.auth.jwt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtDto {

    private Long memberId;
    private String memberName;

    @Builder
    public JwtDto(Long memberId, String memberName) {
        this.memberId = memberId;
        this.memberName = memberName;
    }
}