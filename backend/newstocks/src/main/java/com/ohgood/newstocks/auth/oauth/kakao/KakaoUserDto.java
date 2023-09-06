package com.ohgood.newstocks.auth.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Timestamp;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KakaoUserDto {

    @JsonProperty("id")
    private String authenticationCode;

    @JsonProperty("connected_at")
    private Timestamp connectedAt;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @JsonProperty("properties")
    private Properties properties;

    @Getter
    @ToString
    public static class KakaoAccount {
        private String email;
    }

    @Getter
    @ToString
    public static class Properties {
        @JsonProperty("nickname")
        private String name;
        @JsonProperty("profile_image")
        private String profileImage;
    }

    @Builder
    public KakaoUserDto(String authenticationCode, Timestamp connectedAt, KakaoAccount kakaoAccount, Properties properties) {
        this.authenticationCode = authenticationCode;
        this.connectedAt = connectedAt;
        this.kakaoAccount = kakaoAccount;
        this.properties = properties;
    }
}