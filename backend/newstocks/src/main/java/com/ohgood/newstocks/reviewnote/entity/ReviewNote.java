package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import com.ohgood.newstocks.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table
@NoArgsConstructor
public class ReviewNote extends BaseTimeEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime settingTime;

    @Column(nullable = false)
    private Integer likeCount;

    @Column(nullable = false)
    private Integer scrapCount;

    @Column(nullable = false)
    private Boolean privacy;

    // TODO
    //  오답노트 템플릿 추가 필요

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    private List<ReviewNoteImage> reviewNoteImageList;

    @OneToMany(mappedBy = "reviewNote")
    @Fetch(FetchMode.JOIN)
    private List<Reply> replyList;

    @Builder
    public ReviewNote(LocalDateTime settingTime, Integer likeCount, Integer scrapCount, Boolean privacy, Member member) {
        this.settingTime = settingTime;
        this.likeCount = likeCount;
        this.scrapCount = scrapCount;
        this.privacy = privacy;
        this.member = member;
        this.reviewNoteImageList = new ArrayList<>();
        this.replyList = new ArrayList<>();
    }
}
