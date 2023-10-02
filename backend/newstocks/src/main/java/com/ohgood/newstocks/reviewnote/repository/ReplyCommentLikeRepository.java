package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.ReplyComment;
import com.ohgood.newstocks.reviewnote.entity.ReplyCommentLike;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyCommentLikeRepository extends JpaRepository<ReplyCommentLike, Long> {

    Optional<ReplyCommentLike> findByReplyCommentAndMember(ReplyComment replyComment, Member member);
}
