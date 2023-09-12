package com.ohgood.newstocks.reviewnote.repository;

import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewNoteRepository extends JpaRepository<ReviewNote, Long> {
    Optional<ReviewNote> findByIdAndDeletedFalse(Long reviewNoteId);
}