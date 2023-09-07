package com.ohgood.newstocks.news.repository;

import com.ohgood.newstocks.news.entity.News;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    List<News> findAllByStockId(String stockId);
}
