package com.ohgood.newstocks.stock.repository;


import com.ohgood.newstocks.stock.entity.Chart;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Long> {

    List<Chart> findAllChartByStockId(String stockId);
}
