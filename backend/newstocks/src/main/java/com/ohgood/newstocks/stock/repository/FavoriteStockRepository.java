package com.ohgood.newstocks.stock.repository;

import com.ohgood.newstocks.stock.entity.FavoriteStock;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteStockRepository extends JpaRepository<FavoriteStock, Long> {

    Optional<FavoriteStock> findByStockIdAndMemberId(String stockId, Long memberId);

    List<FavoriteStock> findByMemberId(Long memberId);
}
