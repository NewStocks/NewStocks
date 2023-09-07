package com.ohgood.newstocks.stock.repository;

import com.ohgood.newstocks.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String> {

}