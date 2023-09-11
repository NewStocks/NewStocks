package com.ohgood.newstocks.stock.service;

import com.ohgood.newstocks.news.dto.NewsResDto;
import com.ohgood.newstocks.news.service.NewsService;
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
            chartDataDtoList.add(ChartMapper.INSTANCE.chartDtoToChartDataDto(chartDto));
        }
        return chartDataDtoList;
    }

    private List<DataDto> findAllReviewNoteDataByStockId(String stockId) {
        List<DataDto> reviewNoteDataDtoList = new ArrayList<>();
        List<ChartDto> chartDtoList = findAllChartDto(stockId);
        for (ChartDto chartDto : chartDtoList) {
            reviewNoteDataDtoList.add(ChartMapper.INSTANCE.chartDtoToChartDataDto(chartDto));
        }
        return reviewNoteDataDtoList;
    }

    private List<DataDto> findAllNewsDataByStockId(String stockId) {
        List<DataDto> newsDataDtoList = new ArrayList<>();
        List<NewsResDto> NewsDtoList = newsService.findAllNewsByStockId(stockId);
//        for (NewsResDto newsResDto : NewsDtoList) {
//            newsDataDtoList.add(NewsMapper.INSTANCE.chartDtoToChartDataDto(chartDto));
//        }
        return newsDataDtoList;
    }


    public List<ChartDto> findAllChartDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockId(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.chartEntityToChartDto(chart));
        }
        return chartDtoList;
    }

    public List<ChartDto> findAllReviewNoteDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockId(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.chartEntityToChartDto(chart));
        }
        return chartDtoList;
    }

    public List<ChartDto> findAllNewsDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockId(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.chartEntityToChartDto(chart));
        }
        return chartDtoList;
    }
}
