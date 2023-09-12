package com.ohgood.newstocks.auth.oauth.kakao;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.entity.SocialType;
import com.ohgood.newstocks.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class KakaoService {

    private final MemberRepository memberRepository;

    @Value("${KAKAO_RESTAPI_KEY}")
    private String KAKAO_RESTPAPI_KEY;
    @Value("${KAKAO_REDIRECT_URI}")
    private String KAKAO_REDIRECT_URL;

    private final WebClient webClient;

    public KakaoTokenDto getKakaoAccessToken(String code) {
        String getTokenURL =
                "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id="
                        + KAKAO_RESTPAPI_KEY + "&redirect_uri=" + KAKAO_REDIRECT_URL + "&code="
                        + code;
        return webClient.post()
                .uri(getTokenURL)
                .retrieve()
                .bodyToMono(KakaoTokenDto.class).block();
    }

    public KakaoUserDto getKakaoUser(String kakaoAccessToken) {
        String getUserURL = "https://kapi.kakao.com/v2/user/me";

        return webClient.post()
                        .uri(getUserURL)
                        .header("Authorization", "Bearer " + kakaoAccessToken)
                        .retrieve()
                        .bodyToMono(KakaoUserDto.class)
                        .block();
    }

    // TODO
    //  1. Google 로그인 사용 시 AuthService에 합치기
    //  2. JWT 사용할 때 Member 대신 Token Return
    public Member loginKakao(KakaoUserDto kakaoUserDto) {
        log.info(kakaoUserDto.getAuthenticationCode(), "회원 카카오 로그인");

        Optional<Member> member = memberRepository.findBySocialIdAndDeletedFalse(kakaoUserDto.getAuthenticationCode());

        if (member.isPresent()) {
            log.info("회원가입 된 멤버입니다.");
            // TODO
            //  JWT Return Code Need
            return member.orElseThrow();
        }
        if (kakaoUserDto.getProperties() != null) {
            Member newMember = new Member(
                    kakaoUserDto.getProperties().getName(),
                    kakaoUserDto.getKakaoAccount().getEmail(),
                    kakaoUserDto.getProperties().getProfileImage(),
                    SocialType.KAKAO,
                    kakaoUserDto.getAuthenticationCode()
            );
            return memberRepository.save(newMember);
        }
        return memberRepository.save(new Member(null, null, null, SocialType.KAKAO, kakaoUserDto.getAuthenticationCode()));
    }
}
