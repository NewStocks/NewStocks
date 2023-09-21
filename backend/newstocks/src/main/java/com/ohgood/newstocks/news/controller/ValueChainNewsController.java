package com.ohgood.newstocks.news.controller;

import com.ohgood.newstocks.news.dto.ValueChainNewsDto;
import com.ohgood.newstocks.news.service.ValueChainNewsService;
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
@RequestMapping("/value-chain-news")
public class ValueChainNewsController {

    private final ValueChainNewsService valueChainNewsService;

    @GetMapping("/find/{stock-id}")
    public ResponseEntity<List<ValueChainNewsDto>> findAllByStockId(
        @PathVariable("stock-id") String stockId) {
        List<ValueChainNewsDto> valueChainNewsDtoList = valueChainNewsService.findAllByStockId(
            stockId);
        return new ResponseEntity<>(valueChainNewsDtoList, HttpStatus.OK);
    }

    @GetMapping("/find/{stock-id}/{date}")
    public ResponseEntity<List<ValueChainNewsDto>> findDateNewsByStockId(
        @PathVariable("stock-id") String stockId, @PathVariable("date") String date) {
        List<ValueChainNewsDto> valueChainNewsDtoList = valueChainNewsService.findDateNewsByStockId(
            stockId, date);
        return new ResponseEntity<>(valueChainNewsDtoList, HttpStatus.OK);
    }
}
