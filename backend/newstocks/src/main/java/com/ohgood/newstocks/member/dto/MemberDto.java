package com.ohgood.newstocks.member.dto;

import com.ohgood.newstocks.member.entity.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {

    private Long id;
    private String name;
    private String profileImage;
    private Role role;

    public MemberDto(Long id, String name, String profileImage, Role role) {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
        this.role = role;
    }
}
