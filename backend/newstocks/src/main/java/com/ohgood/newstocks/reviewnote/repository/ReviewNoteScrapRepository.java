package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLike;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteScrap;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewNoteScrapRepository extends JpaRepository<ReviewNoteScrap, Long> {

    Optional<ReviewNoteScrap> findByReviewNoteAndMember(ReviewNote reviewNote, Member member);
}