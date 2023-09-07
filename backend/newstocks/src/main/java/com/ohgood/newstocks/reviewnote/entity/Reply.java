package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
public class Reply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 1000)
    private String content;

    @NotNull
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
