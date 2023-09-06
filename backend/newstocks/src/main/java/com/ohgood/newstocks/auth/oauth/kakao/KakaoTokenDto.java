package com.ohgood.newstocks.auth.oauth.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class KakaoTokenDto {

    @NotNull(message = "accessToken may not be null")
    @JsonProperty("access_token")
    private String accessToken;

    @NotNull(message = "refreshToken may not be null")
    @JsonProperty("refresh_token")
    private String refreshToken;

}