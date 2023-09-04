package com.ohgood.newstocks.member.entity;

import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteScrap;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Entity
@Table
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String profileImage;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Column(nullable = false)
    private String socialId;

    @OneToMany(mappedBy = "member")
    private List<ReviewNote> reviewNoteList;

    @OneToMany(mappedBy = "member")
    private List<ReviewNoteScrap> reviewNoteScrapList;

}
