package com.ohgood.newstocks.member.repository;

import com.ohgood.newstocks.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findBySocialIdAndDeletedFalse(String socialId);
}