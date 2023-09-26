package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.dto.ReplyCommentReqDto;
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
    @JoinColumn(name = "member_id")
    @ToString.Exclude
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_id")
    @ToString.Exclude
    private Reply reply;

    @Builder
    public ReplyComment(@NotNull String content, Member member, Reply reply) {
        this.content = content;
        this.likeCount = 0;
        this.member = member;
        this.reply = reply;
    }

    public void updateReplyComment(ReplyCommentReqDto replyCommentReqDto) {
        this.content = replyCommentReqDto.getContent();
    }

    public void increaseLikeCount() {
        this.likeCount += 1;
    }

    public void decreaseLikeCount() {
        this.likeCount -= 1;
    }
}
