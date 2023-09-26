package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyLikeRepository extends JpaRepository<ReplyLike, Long> {

    Optional<ReplyLike> findByReplyAndMember(Reply reply, Member member);
}
