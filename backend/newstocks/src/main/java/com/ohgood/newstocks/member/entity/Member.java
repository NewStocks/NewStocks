package com.ohgood.newstocks.member.entity;

import com.ohgood.newstocks.reviewnote.entity.ReplyCommentLike;
import com.ohgood.newstocks.reviewnote.entity.ReplyLike;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.entity.ReviewNoteScrap;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
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
    @Fetch(FetchMode.SUBSELECT)
    private List<ReviewNote> reviewNoteList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.SUBSELECT)
    private List<ReviewNoteScrap> reviewNoteScrapList = new ArrayList<>();

    // 좋아요 누른 댓글인지 여부를 DB 접근 없이 확인하기 위함
    // 추후에 성능 개선 할 예정
    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.JOIN)
    private List<ReplyLike> replyLikeList;

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.JOIN)
    private List<ReplyCommentLike> replyCommentLikeList;


}
