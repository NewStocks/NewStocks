package com.ohgood.newstocks.member.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class MemberUpdateDto {

    private String name;
    private MultipartFile multipartFile;
}
