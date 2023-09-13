package com.ohgood.newstocks.stock.service;

import com.ohgood.newstocks.news.dto.NewsDto;
import com.ohgood.newstocks.news.mapper.NewsMapper;
import com.ohgood.newstocks.news.service.NewsService;
import com.ohgood.newstocks.reviewnote.dto.ReviewNoteDto;
import com.ohgood.newstocks.reviewnote.entity.ReviewNote;
import com.ohgood.newstocks.reviewnote.mapper.ReviewNoteMapper;
import com.ohgood.newstocks.reviewnote.repository.ReviewNoteRepository;
import com.ohgood.newstocks.stock.dto.ChartDto;
import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.dto.ChartSeriesDto;
import com.ohgood.newstocks.stock.dto.DataDto;
import com.ohgood.newstocks.stock.entity.Chart;
import com.ohgood.newstocks.stock.mapper.ChartMapper;
import com.ohgood.newstocks.stock.repository.ChartRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

    private final ChartRepository chartRepository;
    private final NewsService newsService;
    private final ReviewNoteRepository reviewNoteRepository;

    public ChartResDto findChartSeriesByStockId(String stockId) {
        List<ChartSeriesDto> chartSeriesDtoList = new ArrayList<>();
        String[] names = {"주식정보", "뉴스정보", "오답노트 정보"};
        String[] types = {"candlestick", "scatter", "scatter"};
        for (int branch = 0; branch < 3; branch++) {
            chartSeriesDtoList.add(ChartSeriesDto.builder().name(names[branch]).type(types[branch])
                .data(findAllDataByStockId(branch, stockId)).build());
        }
        return ChartResDto.builder().name(stockId).series(chartSeriesDtoList).build();
    }

    public List<DataDto> findAllDataByStockId(int branch, String stockId) {
        return switch (branch) {
            case 0 -> findAllChartDataByStockId(stockId);
            case 1 -> findAllNewsDataByStockId(stockId);
            default -> findAllReviewNoteDataByStockId(stockId);
        };
    }

    private List<DataDto> findAllChartDataByStockId(String stockId) {
        List<DataDto> chartDataDtoList = new ArrayList<>();
        List<ChartDto> chartDtoList = findAllChartDto(stockId);
        for (ChartDto chartDto : chartDtoList) {
            chartDataDtoList.add(ChartMapper.INSTANCE.chartDtoToDataDto(chartDto));
        }
        return chartDataDtoList;
    }

    public List<ChartDto> findAllChartDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockIdOrderByDate(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.entityToChartDto(chart));
        }
        return chartDtoList;
    }

    //리뷰노트dto받고 리뷰노트datadto로 받아서 전달하기
    private List<DataDto> findAllReviewNoteDataByStockId(String stockId) {
        List<DataDto> reviewNoteDataDtoList = new ArrayList<>();
        List<ReviewNoteDto> reviewNoteDtoList = findAllReviewNoteDto(stockId);

        for (ReviewNoteDto reviewNoteDto : reviewNoteDtoList) {
            reviewNoteDataDtoList.add(
                ReviewNoteMapper.INSTANCE.reviewNoteDtoToDataDto(reviewNoteDto));
        }
        return reviewNoteDataDtoList;
    }

    public List<ReviewNoteDto> findAllReviewNoteDto(String stockId) {
        List<ReviewNote> reviewNoteList = reviewNoteRepository.findReviewNotesByStockId(stockId);
        List<ReviewNoteDto> reviewNoteDtoList = new ArrayList<>();
        for (ReviewNote reviewNote : reviewNoteList) {
            reviewNoteDtoList.add(ReviewNoteMapper.INSTANCE.entityToReviewNoteDto(reviewNote));
        }
        return reviewNoteDtoList;
    }

    private List<DataDto> findAllNewsDataByStockId(String stockId) {
        List<DataDto> newsDataDtoList = new ArrayList<>();
        List<NewsDto> NewsDtoList = newsService.findAllNewsDtoByStockId(stockId);
        for (NewsDto newsDto : NewsDtoList) {
            newsDataDtoList.add(NewsMapper.INSTANCE.NewsDtoToDataDto(newsDto));
        }
        return newsDataDtoList;
    }

    public List<ChartDto> findAllNewsDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockIdOrderByDate(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.entityToChartDto(chart));
        }
        return chartDtoList;
    }
}
