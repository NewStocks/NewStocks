package com.ohgood.newstocks.member.controller;

import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.dto.MemberUpdateDto;
import com.ohgood.newstocks.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
// TODO Authentication 처리 필요
public class MemberController {

    private final MemberService memberService;

    @GetMapping({"", "/{memberId}"})
    public ResponseEntity<MemberDto> findMember(@PathVariable(required = false) Long memberId, Authentication authentication) {
        return new ResponseEntity<>(memberService.findMember(memberId, Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<MemberDto> updateMember(@ModelAttribute MemberUpdateDto memberUpdateDto, Authentication authentication) {
        return new ResponseEntity<>(memberService.updateMember(memberUpdateDto, Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(Authentication authentication) {
        memberService.deleteMember(Long.parseLong(
            authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
