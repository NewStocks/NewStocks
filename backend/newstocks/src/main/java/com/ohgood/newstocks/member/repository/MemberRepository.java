package com.ohgood.newstocks.member.repository;

import com.ohgood.newstocks.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findBySocialIdAndDeletedFalse(String socialId);

    Optional<Member> findByIdAndDeletedFalse(Long userId);

    List<Member> findByIdInAndDeletedFalse(List<Long> userIdList);
}