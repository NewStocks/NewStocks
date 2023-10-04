package com.ohgood.newstocks.reviewnote.mapper;

import com.ohgood.newstocks.reviewnote.dto.ReviewNoteImageDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteImage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReviewNoteImageMapper {
    ReviewNoteImageMapper INSTANCE = Mappers.getMapper(ReviewNoteImageMapper.class);

    ReviewNoteImageDto entityToReviewNoteImageDto(ReviewNoteImage reviewNoteImage);
}
