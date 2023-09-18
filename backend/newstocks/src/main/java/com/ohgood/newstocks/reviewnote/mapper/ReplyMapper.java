package com.ohgood.newstocks.reviewnote.mapper;

import com.ohgood.newstocks.reviewnote.dto.ReplyReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyResDto;
import com.ohgood.newstocks.reviewnote.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReplyMapper {

    ReplyMapper INSTANCE = Mappers.getMapper(ReplyMapper.class);

    ReplyResDto replyReqDtoToReplyResDto(ReplyReqDto replyReqDto);

    Reply replyResDtoToEntity(ReplyResDto replyResDto);

    ReplyResDto entityToReplyResDto(Reply reply);

}
