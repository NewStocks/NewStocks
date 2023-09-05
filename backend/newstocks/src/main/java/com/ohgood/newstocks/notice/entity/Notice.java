package com.ohgood.newstocks.notice.entity;

import com.ohgood.newstocks.reviewnote.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table
public class Notice extends BaseTimeEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(length = 3000)
    private String content;
}