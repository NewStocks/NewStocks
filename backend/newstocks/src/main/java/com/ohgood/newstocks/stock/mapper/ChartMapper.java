package com.ohgood.newstocks.stock.mapper;

import com.ohgood.newstocks.stock.dto.ChartResDto;
import com.ohgood.newstocks.stock.entity.Chart;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChartMapper {

    ChartMapper INSTANCE = Mappers.getMapper(ChartMapper.class);
    ChartResDto entityToChartResDto(Chart chart);
}
