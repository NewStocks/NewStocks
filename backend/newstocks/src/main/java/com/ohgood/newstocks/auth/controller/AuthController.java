package com.ohgood.newstocks.auth.controller;

import com.ohgood.newstocks.auth.oauth.kakao.KakaoService;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoTokenDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoService kakaoService;

    @GetMapping(value = "/login/kakao")
    public void kakaoLogin(@RequestParam("code") String code) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(code);
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        kakaoService.loginKakao(kakaoUserDto);
    }
}
