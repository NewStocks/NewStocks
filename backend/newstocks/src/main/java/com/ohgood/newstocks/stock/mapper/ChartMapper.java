package com.ohgood.newstocks.stock.mapper;

import com.ohgood.newstocks.stock.dto.DataDto;
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

    ChartDto entityToChartDto(Chart chart);

    @Mapping(source = "date", target = "x", dateFormat = "yyyy/MM/dd")
    @Mapping(target = "y", expression = "java(mapPrices(chartDto))")
    DataDto chartDtoToDataDto(ChartDto chartDto);

    default List<Object> mapPrices(ChartDto chartDto) {
        List<Object> priceList = new ArrayList<>();
        priceList.add(chartDto.getStartPrice());
        priceList.add(chartDto.getHighPrice());
        priceList.add(chartDto.getLowPrice());
        priceList.add(chartDto.getEndPrice());
        priceList.add(chartDto.getVolume().intValue());
        return priceList;
    }
}
