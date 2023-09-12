package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
/**
 * 대댓글 Entity
 */
public class ReplyComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 1000)
    private String content;

    @NotNull
    private Integer likeCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_id")
    @ToString.Exclude
    private Reply reply;

    @Builder
    public ReplyComment(String content, Integer likeCount, Reply reply) {
        this.content = content;
        this.likeCount = likeCount;
        this.reply = reply;
    }
}
