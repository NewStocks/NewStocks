package com.ohgood.newstocks.stock.service;

import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.entity.Chart;
import com.ohgood.newstocks.stock.mapper.ChartMapper;
import com.ohgood.newstocks.stock.repository.ChartRepository;
import com.ohgood.newstocks.stock.repository.StockRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

    private final ChartRepository chartRepository;
    private final StockRepository stockRepository;

    public List<ChartResDto> findAllChartDataByStockId(String stockId) {
        List<Chart> chartList =chartRepository.findAllChartById(stockId);
        List<ChartResDto> chartResDtoList=new ArrayList<>();
        for(Chart chart: chartList){
            chartResDtoList.add(ChartMapper.INSTANCE.entityToChartResDto(chart));
        }
        return chartResDtoList;
    }
}
