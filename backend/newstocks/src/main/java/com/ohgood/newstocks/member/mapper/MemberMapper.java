package com.ohgood.newstocks.member.mapper;

import com.ohgood.newstocks.member.dto.MemberDto;
import com.ohgood.newstocks.member.dto.MemberLoginDto;
import com.ohgood.newstocks.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    MemberDto entityToMemberDto(Member member);
}
