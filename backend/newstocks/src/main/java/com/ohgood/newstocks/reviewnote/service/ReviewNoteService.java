package com.ohgood.newstocks.reviewnote.service;

import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewNoteService {

    private final ReviewNoteRepository reviewNoteRepository;

    public void insertReviewNote() {

    }

}
