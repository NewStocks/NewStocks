package com.ohgood.newstocks.auth.oauth.google;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoogleTokenDto {
    @NotNull(message = "accessToken may not be null")
    @JsonProperty("access_token")
    private String accessToken;

    @NotNull(message = "refreshToken may not be null")
    @JsonProperty("refresh_token")
    private String refreshToken;

    @Builder
    public GoogleTokenDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
