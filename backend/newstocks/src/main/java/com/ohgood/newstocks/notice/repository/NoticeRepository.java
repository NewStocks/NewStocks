package com.ohgood.newstocks.notice.repository;

import com.ohgood.newstocks.notice.entity.Notice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findAll();
}
