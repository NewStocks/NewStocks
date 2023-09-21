package com.ohgood.newstocks.member.service;

import com.ohgood.newstocks.global.service.AwsS3Service;
import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.dto.MemberUpdateDto;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.member.mapper.MemberMapper;
import com.ohgood.newstocks.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final AwsS3Service awsS3Service;

    public MemberDto findMember(Long findMemberId, Long myMemberId) {

        // 내 정보 조회
        if (findMemberId == null) {
            return MemberMapper.INSTANCE.entityToMemberDto(findMemberById(myMemberId));
        }
        // 타인 정보 조회
        // 추후에 프로필 공개 여부 추가할 수 있어 분리
        return MemberMapper.INSTANCE.entityToMemberDto(findMemberById(findMemberId));
    }

    @Transactional
    public MemberDto updateMember(MemberUpdateDto memberUpdateDto, Long memberId) {
        Member member = findMemberById(memberId);
        String url = null;
        if (memberUpdateDto.getMultipartFile() != null) {
            url = awsS3Service.uploadFile("/profile", memberUpdateDto.getMultipartFile());
        }
        member.update(memberUpdateDto.getName(), url);
        return MemberMapper.INSTANCE.entityToMemberDto(memberRepository.save(member));
    }

    @Transactional
    public void deleteMember(Long memberId) {
        Member member = findMemberById(memberId);
        member.delete();
        memberRepository.save(member);
    }

    public Member findMemberById(Long userId) {
        return memberRepository.findByIdAndDeletedFalse(userId)
            .orElseThrow(() -> new ArithmeticException("해당하는 회원이 없습니다."));
    }
}
