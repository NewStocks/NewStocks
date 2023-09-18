package com.ohgood.newstocks.notice.mapper;

import com.ohgood.newstocks.notice.dto.NoticeImageDto;
import com.ohgood.newstocks.notice.entity.NoticeImage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NoticeImageMapper {

    NoticeImageMapper INSTANCE = Mappers.getMapper(NoticeImageMapper.class);

    NoticeImageDto entityToNoticeImageDto(NoticeImage noticeImage);
}
