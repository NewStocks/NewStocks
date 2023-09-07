package com.ohgood.newstocks.news.controller;

import com.ohgood.newstocks.news.dto.NewsResDto;
import com.ohgood.newstocks.news.service.NewsService;
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
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/find/{stock-id}")
    public ResponseEntity<List<NewsResDto>> findAllNews(@PathVariable("stock-id") String stockId) {
        List<NewsResDto> newsResDtos = newsService.findAllNews(stockId);
        return new ResponseEntity<List<NewsResDto>>(newsResDtos, HttpStatus.OK);
    }
}
