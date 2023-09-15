package com.ohgood.newstocks.auth.controller;

import com.ohgood.newstocks.auth.oauth.google.GoogleService;
import com.ohgood.newstocks.auth.oauth.google.GoogleTokenDto;
import com.ohgood.newstocks.auth.oauth.google.GoogleUserDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoService;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoTokenDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoUserDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.dto.ReplyLikeDtoTest;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import com.ohgood.newstocks.reviewnote.mapper.ReplyLikeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoService kakaoService;
    private final GoogleService googleService;

    @GetMapping("/login/kakao")
    public void kakaoLogin(@RequestParam("code") String code) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(code);
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());

        Member loginMember = kakaoService.loginKakao(kakaoUserDto);
    }

    @GetMapping("/login/google")
    public void googleLogin(@RequestParam("code") String code) {
        GoogleTokenDto googleTokenDto = googleService.getGoogleAccessToken(code);
        log.info("access_token = " + googleTokenDto.getAccessToken());

        GoogleUserDto googleUserDto = googleService.getGoogleUser(googleTokenDto.getAccessToken());
        Member loginMember = googleService.loginGoogle(googleUserDto);
    }
}
