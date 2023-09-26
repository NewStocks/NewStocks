package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLike;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewNoteLikeRepository extends JpaRepository<ReviewNoteLike, Long> {

    Optional<ReviewNoteLike> findByReviewNoteAndMember(ReviewNote reviewNote, Member member);
}