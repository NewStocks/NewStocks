package com.ohgood.newstocks.stock.service;

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

    public ChartResDto findChartSeries(String stockId) {
        List<ChartSeriesDto> chartSeriesDtoList = new ArrayList<>();
        String[] names = {"주식정보", "뉴스정보", "오답노트 정보"};
        String[] types = {"candlestic", "scatter", "scatter"};
        for (int branch = 0; branch < 3; branch++) {
            chartSeriesDtoList.add(ChartSeriesDto.builder().name(names[branch]).type(types[branch])
                .data(findAllData(branch, stockId)).build());
        }
        return ChartResDto.builder().name(stockId).series(chartSeriesDtoList).build();
    }

    public List<DataDto> findAllData(int branch, String stockId) {
        return switch (branch) {
            case 0 -> findAllChartData(stockId);
            case 1 -> findAllNewsData(stockId);
            default -> findAllReviewNoteData(stockId);
        };
    }

    private List<DataDto> findAllChartData(String stockId) {
        List<DataDto> chartDataDtoList = new ArrayList<>();
        List<ChartDto> chartDtoList = findAllChartDto(stockId);
        for (ChartDto chartDto : chartDtoList) {
            chartDataDtoList.add(ChartMapper.INSTANCE.chartDtoToChartDataDto(chartDto));
        }
        return chartDataDtoList;
    }

    private List<DataDto> findAllReviewNoteData(String stockId) {
        return null;
    }

    private List<DataDto> findAllNewsData(String stockId) {
        return null;
    }


    public List<ChartDto> findAllChartDto(String stockId) {
        List<Chart> chartList = chartRepository.findAllChartByStockId(stockId);
        List<ChartDto> chartDtoList = new ArrayList<>();
        for (Chart chart : chartList) {
            chartDtoList.add(ChartMapper.INSTANCE.chartEntityToChartDto(chart));
        }
        return chartDtoList;
    }
}
