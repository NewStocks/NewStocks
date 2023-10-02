package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewNoteRepository extends JpaRepository<ReviewNote, Long> {

    Optional<ReviewNote> findByIdAndDeletedFalse(Long reviewNoteId);

    List<ReviewNote> findReviewNotesByStockId(String stockId);

    List<ReviewNote> findByMemberAndDeletedFalse(Member member);

    List<ReviewNote> findByPrivacyFalseAndMemberAndDeletedFalse(Member member);

    List<ReviewNote> findByPrivacyFalseOrMemberAndDeletedFalse(Member member);

    List<ReviewNote> findByMemberInAndPrivacyFalseAndDeletedFalse(List<Member> memberList);

    List<ReviewNote> findByPrivacyFalseAndDeletedFalseOrderByLikeCountDesc();

    List<ReviewNote> findReviewNotesByStockIdAndMemberId(String stockId, Long memberId);
    
    List<ReviewNote> findByPrivacyFalseAndDeletedFalseAndAndTitleContainingOrContentContaining(String title, String content);

    List<ReviewNote> findReviewNotesByStockIdAndPrivacyFalseAndDeletedFalse(String stockId);
}