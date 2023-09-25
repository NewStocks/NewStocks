package com.ohgood.newstocks.member.repository;

import com.ohgood.newstocks.member.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {

}