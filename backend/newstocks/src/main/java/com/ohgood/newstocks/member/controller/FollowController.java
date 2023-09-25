package com.ohgood.newstocks.member.controller;

import com.ohgood.newstocks.member.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{follwingId}")
    public ResponseEntity<Void> follow(@PathVariable Long follwingId) {
        // 추후 Authentication 처리 예정
        followService.follow(5L, follwingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{followingId}")
    public ResponseEntity<Void> unfollow(@PathVariable Long followingId) {
        // 추후 Authentication 처리 예정
        followService.unfollow(5L, followingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
