package com.ohgood.newstocks.reviewnote.mapper;

import com.ohgood.newstocks.reviewnote.dto.ReviewNoteLinkDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteLink;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReviewNoteLinkMapper {

    ReviewNoteLinkMapper INSTANCE = Mappers.getMapper(ReviewNoteLinkMapper.class);

    ReviewNoteLinkDto entityToReviewNoteLinkDto(ReviewNoteLink reviewNoteLink);

}
