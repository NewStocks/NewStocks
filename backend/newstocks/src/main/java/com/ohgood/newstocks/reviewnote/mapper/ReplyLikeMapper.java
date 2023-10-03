package com.ohgood.newstocks.reviewnote.mapper;


import com.ohgood.newstocks.reviewnote.dto.ReplyLikeDtoTest;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReplyLikeMapper {

    ReplyLikeMapper INSTANCE = Mappers.getMapper(ReplyLikeMapper.class);

    ReplyLikeDtoTest entityToDto(ReplyLike replyLike);

    ReplyLike dtoToEntity(ReplyLikeDtoTest replyLikeDtoTest);

}
