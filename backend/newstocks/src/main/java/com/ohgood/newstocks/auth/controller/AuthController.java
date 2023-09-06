package com.ohgood.newstocks.auth.controller;

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

    @GetMapping(value = "/login/kakao")
    public void kakaoLogin(@RequestParam("code") String code) {
        KakaoTokenDto kakaoTokenDto = kakaoService.getKakaoAccessToken(code);
        KakaoUserDto kakaoUserDto = kakaoService.getKakaoUser(kakaoTokenDto.getAccessToken());
        Member loginMember = kakaoService.loginKakao(kakaoUserDto);

        log.info("테스트 시작");
        ReplyLikeDtoTest replyLikeDtoTest = new ReplyLikeDtoTest(1L, loginMember);

        log.info("" + replyLikeDtoTest.getId());

        ReplyLike replyLike = ReplyLikeMapper.INSTANCE.dtoToEntity(replyLikeDtoTest);
//        ReplyLike replyLike = replyLikeMapper.INSTANCE.dtoToEntity(replyLikeDtoTest);
        log.info(replyLike.getMember().getName());
    }
}
