package com.ohgood.newstocks.notice.mapper;

import com.ohgood.newstocks.notice.dto.NoticeDto;
import com.ohgood.newstocks.notice.dto.NoticeImageDto;
import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.entity.NoticeImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NoticeMapper {

    NoticeMapper INSTANCE = Mappers.getMapper(NoticeMapper.class);

    @Mapping(target = "noticeImageDtoList", ignore = true)
    NoticeDto entityToNoticeDto(Notice notice);
    NoticeImageDto entityToNoticeImageDto(NoticeImage noticeImage);
}
