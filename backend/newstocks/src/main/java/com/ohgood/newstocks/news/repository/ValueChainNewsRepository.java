package com.ohgood.newstocks.news.repository;

import com.ohgood.newstocks.news.entity.ValueChainNews;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ValueChainNewsRepository extends JpaRepository<ValueChainNews, Long> {

    List<ValueChainNews> findAllByValueChainIdOrderByPublishTimeDesc(String valueChainId);

    @Query("select vn from ValueChainNews vn "
        + "where vn.valueChainId = :valueChainId and Date(vn.publishTime) = :date "
        + "order by vn.publishTime desc")
    List<ValueChainNews> findDateNewsByValueChainId(String valueChainId, LocalDate date);
}
