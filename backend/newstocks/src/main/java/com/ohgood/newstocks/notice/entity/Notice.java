package com.ohgood.newstocks.notice.entity;

import com.ohgood.newstocks.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseTimeEntity {

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
}