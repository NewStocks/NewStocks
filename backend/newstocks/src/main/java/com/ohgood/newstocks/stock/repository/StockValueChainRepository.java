package com.ohgood.newstocks.stock.repository;

import com.ohgood.newstocks.stock.entity.StockValueChain;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockValueChainRepository extends JpaRepository<StockValueChain, Long> {

    List<StockValueChain> findAllByStockId(String stockId);
}
