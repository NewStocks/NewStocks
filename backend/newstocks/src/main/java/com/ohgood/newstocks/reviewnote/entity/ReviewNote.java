package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.member.entity.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
    @Builder.Default
    private Integer likeCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer scrapCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean privacy = false;

    // TODO
    //  오답노트 템플릿 추가 필요

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToMany(mappedBy = "reviewNote")
    private List<ReviewNoteImage> reviewNoteImageList;

    @OneToMany(mappedBy = "reviewNote")
    private List<Reply> replyList;

}
