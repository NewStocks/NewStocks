package com.ohgood.newstocks.auth.oauth.kakao;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class KakaoReqDto {
    private String code;
}
