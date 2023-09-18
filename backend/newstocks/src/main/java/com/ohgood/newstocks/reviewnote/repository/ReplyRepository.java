package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.reviewnote.entity.Reply;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    List<Reply> findByReviewNote(ReviewNote reviewNote);
}