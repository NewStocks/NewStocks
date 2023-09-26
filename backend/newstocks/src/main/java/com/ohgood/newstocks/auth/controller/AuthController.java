package com.ohgood.newstocks.auth.controller;

import com.ohgood.newstocks.auth.oauth.google.GoogleService;
import com.ohgood.newstocks.auth.oauth.google.GoogleTokenDto;
import com.ohgood.newstocks.auth.oauth.google.GoogleUserDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoReqDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoReqDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoService;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoTokenDto;
import com.ohgood.newstocks.auth.oauth.kakao.KakaoUserDto;
import com.ohgood.newstocks.member.dto.MemberLoginDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.reviewnote.dto.ReplyLikeDtoTest;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import com.ohgood.newstocks.reviewnote.mapper.ReplyLikeMapper;
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
    public ResponseEntity<MemberLoginDto> kakaoLogin(@RequestBody KakaoReqDto kakaoReqDto) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(kakaoReqDto.getCode());
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        Member loginMember = kakaoService.loginKakao(kakaoUserDto);
        log.info("" + kakaoService.getMemberLoginDto(loginMember));
        return new ResponseEntity<>(kakaoService.getMemberLoginDto(loginMember), HttpStatus.OK);
    }

    @GetMapping("/login/google")
    public ResponseEntity<MemberLoginDto> googleLogin(@RequestParam("code") String code) {
        GoogleTokenDto googleTokenDto = googleService.getGoogleAccessToken(code);
        log.info("access_token = " + googleTokenDto.getAccessToken());
        GoogleUserDto googleUserDto = googleService.getGoogleUser(googleTokenDto.getAccessToken());
        Member loginMember = googleService.loginGoogle(googleUserDto);
        return new ResponseEntity<>(kakaoService.getMemberLoginDto(loginMember), HttpStatus.OK);
    }
}
