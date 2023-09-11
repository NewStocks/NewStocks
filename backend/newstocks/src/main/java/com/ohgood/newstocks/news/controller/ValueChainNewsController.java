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

    @GetMapping("/find/{value-chain-id}")
    public ResponseEntity<List<ValueChainNewsDto>> findAllByValueChainId(
        @PathVariable("value-chain-id") String valueChainId) {
        List<ValueChainNewsDto> valueChainNewsDtoList = valueChainNewsService.findAllByValueChainId(
            valueChainId);
        return new ResponseEntity<>(valueChainNewsDtoList, HttpStatus.OK);
    }

    @GetMapping("/find/{value-chain-id}/{date}")
    public ResponseEntity<List<ValueChainNewsDto>> findAllByValueChainId(
        @PathVariable("value-chain-id") String valueChainId, @PathVariable("date") String date) {
        List<ValueChainNewsDto> valueChainNewsDtoList = valueChainNewsService.findDateNewsByValueChainId(
            valueChainId, date);
        return new ResponseEntity<>(valueChainNewsDtoList, HttpStatus.OK);
    }
}
