package com.ohgood.newstocks.stock.controller;

import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.dto.StockResDto;
import com.ohgood.newstocks.stock.dto.StockSearchDto;
import com.ohgood.newstocks.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stock")
public class StockController {

    private final StockService stockService;

    @GetMapping("/find-chart/{stock-id}")
    public ResponseEntity<ChartResDto> findChartSeriesByStockId(
        @PathVariable("stock-id") String stockId) {
        return new ResponseEntity<>(stockService.findChartSeriesByStockId(stockId), HttpStatus.OK);
    }

    @GetMapping("/find-stock-info/{stock-id}")
    public ResponseEntity<StockResDto> findStockInfoByStockId(
        @PathVariable("stock-id") String stockId) {
        return new ResponseEntity<>(stockService.findStockInfoByStockId(stockId), HttpStatus.OK);
    }

    @GetMapping("/find-all-stock-for-search")
    public ResponseEntity<StockSearchDto> findAllStockForSearch() {
        return new ResponseEntity<>(stockService.findAllStockForSearch(), HttpStatus.OK);
    }
}
