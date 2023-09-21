package com.ohgood.newstocks.member.controller;

import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping({"", "/{memberId}"})
    public ResponseEntity<MemberDto> findMember(@PathVariable(required = false) Long memberId) {
        // 추후 Authentication 처리 예정
        return new ResponseEntity<>(memberService.findMember(memberId, 5L), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember() {
        // 추후 Authentication 처리 예정
        memberService.deleteMember(5L);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
