package com.ohgood.newstocks.reviewnote.mapper;

import com.ohgood.newstocks.reviewnote.dto.ReviewNoteDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteResDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.stock.dto.DataDto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReviewNoteMapper {

    ReviewNoteMapper INSTANCE = Mappers.getMapper(ReviewNoteMapper.class);

    ReviewNoteResDto entityToReviewNoteResDto(ReviewNote reviewNote);

    ReviewNoteResDto reviewNoteReqDtoToReviewNoteResDto(ReviewNoteReqDto reviewNoteReqDto);

    ReviewNote reviewNoteResDtoToEntity(ReviewNoteResDto reviewNoteResDto);

    ReviewNoteDto entityToReviewNoteDto(ReviewNote reviewNote);

    @Mapping(source = "settingDate", target = "x", qualifiedByName = "localDateTimeToLocalDate")
    @Mapping(target = "y", expression = "java(mapReview(reviewNoteDto))")
    DataDto reviewNoteDtoToDataDto(ReviewNoteDto reviewNoteDto);

    default List<Object> mapReview(ReviewNoteDto reviewNoteDto) {
        List<Object> reviewDetailList = new ArrayList<>();
        reviewDetailList.add(reviewNoteDto.getTitle());
        reviewDetailList.add(reviewNoteDto.getId());
        return reviewDetailList;
    }

    @Named("localDateTimeToLocalDate")
    default LocalDate mapLocalDateTimeToLocalDate(LocalDateTime localDateTime) {
        if (localDateTime != null) {
            return localDateTime.toLocalDate();
        } else {
            return null;
        }
    }
}
