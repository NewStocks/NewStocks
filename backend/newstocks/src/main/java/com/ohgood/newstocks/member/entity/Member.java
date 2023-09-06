package com.ohgood.newstocks.member.entity;

import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.reviewnote.entity.*;
import com.ohgood.newstocks.stock.entity.FavoriteStock;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

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
    @ToString.Exclude
    private List<ReviewNote> reviewNoteList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.SUBSELECT)
    @ToString.Exclude
    private List<ReviewNoteScrap> reviewNoteScrapList = new ArrayList<>();

    // 좋아요 누른 댓글인지 여부를 DB 접근 없이 확인하기 위함
    // 추후에 성능 개선 할 예정

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReviewNoteLike> reviewNoteLikeList;

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReplyLike> replyLikeList;

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReplyCommentLike> replyCommentLikeList;

    @OneToMany(mappedBy = "member")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<FavoriteStock> favoriteStockList;

    @Builder
    public Member(String name, String email, String profileImage, SocialType socialType, String socialId) {
        this.name = name == null ? "이름" : name;
        this.email = email == null ? "이메일" : email;
        this.profileImage = profileImage == null ? "" : profileImage;
        this.socialType = socialType;
        this.socialId = socialId;
        this.reviewNoteList = new ArrayList<>();
        this.reviewNoteLikeList = new ArrayList<>();
        this.reviewNoteScrapList = new ArrayList<>();
        this.replyLikeList = new ArrayList<>();
        this.replyCommentLikeList = new ArrayList<>();
        this.favoriteStockList = new ArrayList<>();
    }
}
