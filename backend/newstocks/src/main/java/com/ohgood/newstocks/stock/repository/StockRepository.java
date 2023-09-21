package com.ohgood.newstocks.stock.repository;

import com.ohgood.newstocks.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {

}