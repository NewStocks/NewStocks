package com.ohgood.newstocks.news.repository;

import com.ohgood.newstocks.news.entity.News;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    List<News> findAllByStockIdOrderByPublishTimeDesc(String stockId);

    @Query("select n from News n "
        + "where n.stock.id = :stockId and Date(n.publishTime) = :date "
        + "order by n.publishTime desc")
    List<News> findDateNewsByStockId(@Param("stockId") String stockId,
        @Param("date") LocalDate date);
}
