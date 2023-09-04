package com.ohgood.newstocks.reviewnote.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table
@NoArgsConstructor
public class ReplyCommentLike {

    @Id
    @Column
    @GeneratedValue
    private Long id;


}
