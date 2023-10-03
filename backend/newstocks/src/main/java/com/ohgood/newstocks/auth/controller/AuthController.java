package com.ohgood.newstocks.auth.controller;

import com.ohgood.newstocks.auth.oauth.google.GoogleService;
import com.ohgood.newstocks.auth.oauth.google.GoogleTokenDto;
import com.ohgood.newstocks.auth.oauth.google.GoogleUserDto;
import com.ohgood.newstocks.auth.oauth.common.OAuthReqDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoService;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoTokenDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoUserDto;
import com.ohgood.newstocks.member.dto.MemberLoginDto;
import com.ohgood.newstocks.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoService kakaoService;
    private final GoogleService googleService;

    @PostMapping("/login/kakao")
    public ResponseEntity<MemberLoginDto> kakaoLogin(@RequestBody OAuthReqDto oAuthReqDto) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(oAuthReqDto.getCode());
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        Member loginMember = kakaoService.loginKakao(kakaoUserDto);
        return new ResponseEntity<>(kakaoService.getMemberLoginDto(loginMember), HttpStatus.OK);
    }

    @PostMapping("/login/google")
    public ResponseEntity<MemberLoginDto> googleLogin(@RequestBody OAuthReqDto oAuthReqDto) {
        GoogleTokenDto googleTokenDto = googleService.getGoogleAccessToken(oAuthReqDto.getCode());
        GoogleUserDto googleUserDto = googleService.getGoogleUser(googleTokenDto.getAccessToken());
        Member loginMember = googleService.loginGoogle(googleUserDto);
        return new ResponseEntity<>(kakaoService.getMemberLoginDto(loginMember), HttpStatus.OK);
    }
}
