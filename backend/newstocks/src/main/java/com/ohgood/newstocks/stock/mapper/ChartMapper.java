package com.ohgood.newstocks.stock.mapper;

import com.ohgood.newstocks.stock.dto.ChartDataDto;
import com.ohgood.newstocks.stock.dto.ChartDto;
import com.ohgood.newstocks.stock.entity.Chart;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChartMapper {

    ChartMapper INSTANCE = Mappers.getMapper(ChartMapper.class);

    ChartDto chartEntityToChartDto(Chart chart);

    @Mapping(source = "date", target = "x", dateFormat = "yyyy/MM/dd")
    @Mapping(target = "y", expression = "java(mapPrices(chartDto))")
    ChartDataDto chartDtoToChartDataDto(ChartDto chartDto);

    default List<Integer> mapPrices(ChartDto chartDto) {
        List<Integer> prices = new ArrayList<>();
        prices.add(chartDto.getStartPrice());
        prices.add(chartDto.getHighPrice());
        prices.add(chartDto.getLowPrice());
        prices.add(chartDto.getEndPrice());
        prices.add(chartDto.getVolume().intValue());
        return prices;
    }
}
