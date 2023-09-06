package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
/**
 * 대댓글 Entity
 */
public class ReplyComment extends BaseTimeEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(nullable = false)
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
