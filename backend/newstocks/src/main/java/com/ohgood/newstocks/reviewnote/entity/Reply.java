package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseTimeEntity;
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
public class Reply extends BaseTimeEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer likeCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_note_id")
    @ToString.Exclude
    private ReviewNote reviewNote;

    @OneToMany(mappedBy = "reply")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReplyComment> replyCommentList;

    @Builder
    public Reply(String content, Integer likeCount, ReviewNote reviewNote) {
        this.content = content;
        this.likeCount = likeCount;
        this.reviewNote = reviewNote;
        this.replyCommentList = new ArrayList<>();
    }
}
