package com.ohgood.newstocks.member.service;

import com.ohgood.newstocks.member.entity.Follow;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.repository.FollowRepository;
import com.ohgood.newstocks.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public void follow(Long followerMemberId, Long followingMemberId) {
        findMemberById(followerMemberId);
        findMemberById(followingMemberId);
        followRepository.save(
            Follow.builder().followingId(followingMemberId).followerId(followerMemberId)
                .build());
    }

    // 고려할 점
    // 이렇게 진행한다면 회원 탈퇴시 팔로워 팔로잉 수가 불일치함
    // 탈퇴 회원 확인하려면 모든 팔로우 관계의 있는 멤버에 대한 delete 확인 필요

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
    }
}
