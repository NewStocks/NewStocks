package com.ohgood.newstocks.stock.repository;

import com.ohgood.newstocks.stock.entity.ValueChain;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValueChainRepository extends JpaRepository<ValueChain, Long> {

    List<ValueChain> findAllById(String stockId);
}
