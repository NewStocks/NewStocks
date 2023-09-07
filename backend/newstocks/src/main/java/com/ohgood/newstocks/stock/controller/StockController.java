package com.ohgood.newstocks.stock.controller;

import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.service.StockService;
import java.util.List;
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
    public ResponseEntity<List<ChartResDto>> findAllChartDataByStockId(
        @PathVariable("stock-id") String stockId) {
        List<ChartResDto> chartResDtoList = stockService.findAllChartDataByStockId(stockId);
        return new ResponseEntity<>(chartResDtoList, HttpStatus.OK);
    }
}
