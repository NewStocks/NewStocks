package com.ohgood.newstocks.news.repository;

import com.ohgood.newstocks.news.entity.ValueChainNews;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ValueChainNewsRepository extends JpaRepository<ValueChainNews, Long> {

    @Query("select vn from  ValueChainNews vn "
        + "where vn.valueChainId in "
        + "(select sv.valueChain.id from StockValueChain sv where sv.stock.id = :stockId) "
        + "order by vn.publishTime desc")
    List<ValueChainNews> findAllByStockId(String stockId);

    @Query("select vn from ValueChainNews vn "
        + "where vn.valueChainId in "
        + "(select sv.valueChain.id from StockValueChain sv where sv.stock.id = :stockId) "
        + "and Date(vn.publishTime) = :date "
        + "order by vn.publishTime desc")
    List<ValueChainNews> findDateNewsByStockId(String stockId, LocalDate date);
}
