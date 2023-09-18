package com.ohgood.newstocks.notice.entity;

import com.ohgood.newstocks.global.entity.BaseEntity;
import com.ohgood.newstocks.notice.dto.NoticeInsertReqDto;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(length = 3000)
    private String content;

    @OneToMany(mappedBy = "notice", fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private List<NoticeImage> noticeImageList;

    public void updateNotice(NoticeInsertReqDto noticeInsertReqDto) {
        this.title = noticeInsertReqDto.getTitle();
        this.content = noticeInsertReqDto.getContent();
    }

    @Builder
    public Notice(String title, String content) {
        this.title = title;
        this.content = content;
        this.noticeImageList = new ArrayList<>();
    }
}