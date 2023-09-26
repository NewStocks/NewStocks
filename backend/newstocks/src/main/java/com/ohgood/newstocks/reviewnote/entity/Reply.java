package com.ohgood.newstocks.reviewnote.entity;

import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.member.entity.Member;
import com.ohgood.newstocks.reviewnote.dto.ReplyReqDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @ToString.Exclude
    private Member member;

    @OneToMany(mappedBy = "reply")
    @Fetch(FetchMode.JOIN)
    @ToString.Exclude
    private List<ReplyComment> replyCommentList;

    @Builder
    public Reply(String content, ReviewNote reviewNote, Member member) {
        this.content = content;
        this.likeCount = 0;
        this.reviewNote = reviewNote;
        this.member = member;
        this.replyCommentList = new ArrayList<>();
    }

    public void addDetails(Member member, ReviewNote reviewNote) {
        this.member = member;
        this.reviewNote = reviewNote;
    }

    public void updateReply(ReplyReqDto replyReqDto) {
        this.content = replyReqDto.getContent();
    }

    public void increaseLikeCount() {
        this.likeCount += 1;
    }

    public void decreaseLikeCount() {
        this.likeCount -= 1;
    }
}
