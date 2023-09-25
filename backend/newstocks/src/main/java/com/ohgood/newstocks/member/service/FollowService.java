package com.ohgood.newstocks.member.service;

import com.ohgood.newstocks.global.exception.exceptions.BadRequestException;
import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.entity.Follow;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.member.repository.FollowRepository;
import com.ohgood.newstocks.member.repository.MemberRepository;
import java.util.List;
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

    public List<MemberDto> findFollowerList(Long followingId) {
        List<Long> followerIdList = followRepository.findByFollowingId(followingId).stream()
            .map(Follow::getFollowerId).toList();

        return memberRepository.findByIdInAndDeletedFalse(followerIdList).stream()
            .map(MemberMapper.INSTANCE::entityToMemberDto).toList();
    }

    public List<MemberDto> findFollowingList(Long followerId) {
        List<Long> followingIdList = followRepository.findByFollowerId(followerId).stream()
            .map(Follow::getFollowingId).toList();

        return memberRepository.findByIdInAndDeletedFalse(followingIdList).stream()
            .map(MemberMapper.INSTANCE::entityToMemberDto).toList();
    }

    @Transactional
    public void follow(Long followerId, Long followingId) {
        findMemberById(followerId);
        findMemberById(followingId);

        if (followRepository.findByFollowerIdAndFollowingId(followerId, followingId).isPresent()) {
            throw new BadRequestException("이미 팔로우 관계입니다.");
        }
        followRepository.save(
            Follow.builder().followingId(followingId).followerId(followerId)
                .build());
    }

    @Transactional
    public void unfollow(Long followerId, Long followingId) {
        findMemberById(followerId);
        findMemberById(followingId);

        Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId)
            .orElseThrow(() -> new BadRequestException("팔로우 관계가 아닙니다."));

        followRepository.delete(follow);
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
    }
}
