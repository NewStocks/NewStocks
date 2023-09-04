package com.ohgood.newstocks.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String profileImage;

    @Column
    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Column
    private String socialId;

}
