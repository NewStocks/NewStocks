package com.ohgood.newstocks.auth.oauth.google;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.entity.SocialType;
import com.ohgood.newstocks.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GoogleService {

    private final MemberRepository memberRepository;
    private final WebClient webClient;

    @Value("${GOOGLE_CLIENT_ID}")
    private String GOOGLE_CLIENT_ID;
    @Value("${GOOGLE_CLIENT_SECRET}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${GOOGLE_REDIRECT_URI}")
    private String GOOGLE_REDIRECT_URI;

    public GoogleTokenDto getGoogleAccessToken(String code) {
        String getTokenURL = "https://oauth2.googleapis.com/token";

        GoogleGetAccessTokenDto getAccessTokenDto = GoogleGetAccessTokenDto
            .builder()
            .code(code)
            .clientId(GOOGLE_CLIENT_ID)
            .clientSecret(GOOGLE_CLIENT_SECRET)
            .redirectUri(GOOGLE_REDIRECT_URI)
            .grantType("authorization_code")
            .build();

        return webClient.post()
            .uri(getTokenURL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(getAccessTokenDto)    // bodyValue 사용
            .retrieve()
            .bodyToMono(GoogleTokenDto.class)
            .block();
    }

    public GoogleUserDto getGoogleUser(String googleAccessToken) {
        String getUserURL = "https://www.googleapis.com/oauth2/v2/userinfo";

        return webClient.get()
            .uri(getUserURL)
            .header("Authorization", "Bearer " + googleAccessToken)
            .retrieve()
            .bodyToMono(GoogleUserDto.class)
            .block();
    }

    @Transactional
    public Member loginGoogle(GoogleUserDto googleUserDto) {
        Optional<Member> member = memberRepository.findBySocialIdAndDeletedFalse(
            googleUserDto.getAuthenticationCode());

        if (member.isPresent()) {
            log.info("회원가입 된 멤버입니다.");
            // TODO
            //  JWT Return Code Need
            return member.orElseThrow();
        }

        return memberRepository.save(Member.builder()
            .name(googleUserDto.getName())
            .email(googleUserDto.getEmail())
            .profileImage(googleUserDto.getPicture())
            .socialType(SocialType.GOOGLE)
            .socialId(googleUserDto.getAuthenticationCode())
            .build());
    }
}
