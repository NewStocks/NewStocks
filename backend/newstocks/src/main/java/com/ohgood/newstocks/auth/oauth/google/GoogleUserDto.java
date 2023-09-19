package com.ohgood.newstocks.auth.oauth.google;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoogleUserDto {

    @JsonProperty("id")
    private String authenticationCode;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("picture")
    private String picture;

    @Builder
    public GoogleUserDto(String authenticationCode, String name, String email, String picture) {
        this.authenticationCode = authenticationCode;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }
}
