package com.ohgood.newstocks.member.controller;

import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.service.FollowService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
// TODO Authentication 처리 필요
public class FollowController {

    private final FollowService followService;

    @GetMapping({"/follower", "/follower/{memberId}"})
    public ResponseEntity<List<MemberDto>> findFollowerList(Authentication authentication,
        @PathVariable(required = false) Long memberId) {
        return new ResponseEntity<>(followService.findFollowerList(memberId, Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @GetMapping({"/following", "/following/{memberId}"})
    public ResponseEntity<List<MemberDto>> findFollowingList(Authentication authentication,
        @PathVariable(required = false) Long memberId) {
        return new ResponseEntity<>(followService.findFollowingList(memberId, Long.parseLong(
            authentication.getName())), HttpStatus.OK);
    }

    @PostMapping("/{follwingId}")
    public ResponseEntity<Void> follow(@PathVariable Long follwingId,
        Authentication authentication) {
        followService.follow(Long.parseLong(
            authentication.getName()), follwingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{followingId}")
    public ResponseEntity<Void> unfollow(@PathVariable Long followingId,
        Authentication authentication) {
        followService.unfollow(Long.parseLong(
            authentication.getName()), followingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
