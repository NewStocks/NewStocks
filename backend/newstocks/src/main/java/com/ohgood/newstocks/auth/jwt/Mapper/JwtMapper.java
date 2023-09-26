package com.ohgood.newstocks.auth.jwt.Mapper;

import com.ohgood.newstocks.auth.jwt.dto.JwtDto;
import com.ohgood.newstocks.member.dto.MemberDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JwtMapper {

    JwtMapper INSTANCE = Mappers.getMapper(JwtMapper.class);

    JwtDto MemberDtoToJwtDto(MemberDto memberDto);
}
