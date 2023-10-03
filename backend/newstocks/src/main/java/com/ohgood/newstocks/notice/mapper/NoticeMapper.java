package com.ohgood.newstocks.notice.mapper;

import com.ohgood.newstocks.notice.dto.NoticeDto;
import com.ohgood.newstocks.notice.dto.NoticeImageDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertReqDto;
import com.ohgood.newstocks.notice.dto.NoticeInsertResDto;
import com.ohgood.newstocks.notice.dto.NoticeUpdateReqDto;
import com.ohgood.newstocks.notice.entity.Notice;
import com.ohgood.newstocks.notice.entity.NoticeImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NoticeMapper {

    NoticeMapper INSTANCE = Mappers.getMapper(NoticeMapper.class);

    Notice noticeReqDtoToEntity(NoticeInsertReqDto dto);

    @Mapping(target = "noticeImageDtoList", ignore = true)
    NoticeDto entityToNoticeDto(Notice notice);

    NoticeInsertResDto entityToNoticeInsertResDto(Notice notice);

    NoticeImageDto entityToNoticeImageDto(NoticeImage noticeImage);

    NoticeInsertReqDto noticeUpdateReqDtoToNoticeInsertResDto(NoticeUpdateReqDto noticeUpdateReqDto);
}
