package com.ohgood.newstocks.global.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
public abstract class BaseEntity extends BaseTimeEntity {

    @Column(columnDefinition = "Boolean default false")
    private Boolean deleted = false;

    public void delete() {
        this.deleted = true;
    }
}
