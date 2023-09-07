package com.ohgood.newstocks.reviewnote.mapper;

import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReviewNoteMapper {

    ReviewNoteMapper INSTANCE = Mappers.getMapper(ReviewNoteMapper.class);

    ReviewNoteResDto entityToReviewNoteResDto(ReviewNote reviewNote);
    ReviewNoteResDto reviewNoteReqDtoToReviewNoteResDto(ReviewNoteReqDto reviewNoteReqDto);
    ReviewNote reviewNoteResDtoToEntity(ReviewNoteResDto reviewNoteResDto);

}
