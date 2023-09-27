package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReplyComment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyCommentRepository extends JpaRepository<ReplyComment, Long> {

    List<ReplyComment> findByReplyAndDeletedFalse(Reply reply);

    Optional<ReplyComment> findReplyCommentById(Long replyCommentId);
}
