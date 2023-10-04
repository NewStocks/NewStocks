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

    List<ReviewNote> findByMemberAndDeletedFalseOrderByCreatedDateDesc(Member member);

    List<ReviewNote> findByPrivacyFalseAndMemberAndDeletedFalseOrderByCreatedDateDesc(Member member);

    List<ReviewNote> findByPrivacyFalseOrMemberAndDeletedFalseOrderByCreatedDateDesc(Member member);

    List<ReviewNote> findByMemberInAndPrivacyFalseAndDeletedFalseOrderByCreatedDateDesc(List<Member> memberList);

    List<ReviewNote> findByPrivacyFalseAndDeletedFalseOrderByLikeCountDesc();

    List<ReviewNote> findReviewNotesByStockIdAndMemberIdAndDeletedFalseOrderByCreatedDateDesc(String stockId, Long memberId);
    
    List<ReviewNote> findByPrivacyFalseAndDeletedFalseAndTitleContainingOrContentContainingOrderByCreatedDateDesc(String title, String content);

    List<ReviewNote> findReviewNotesByStockIdAndPrivacyFalseAndDeletedFalseOrderByCreatedDateDesc(String stockId);
}