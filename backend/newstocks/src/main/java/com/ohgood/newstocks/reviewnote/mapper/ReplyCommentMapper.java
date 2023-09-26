package com.ohgood.newstocks.reviewnote.mapper;

import com.ohgood.newstocks.reviewnote.dto.ReplyCommentReqDto;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentResDto;
import com.ohgood.newstocks.reviewnote.entity.ReplyComment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReplyCommentMapper {

    ReplyCommentMapper INSTANCE = Mappers.getMapper(ReplyCommentMapper.class);

    ReplyCommentResDto replyCommentReqDtoToReplyCommentResDto(ReplyCommentReqDto replyCommentReqDto);

    ReplyComment replyCommentResDtoToEntity(ReplyCommentResDto replyCommentResDto);

    ReplyCommentResDto entityToReplyCommentResDto(ReplyComment replyComment);
}
