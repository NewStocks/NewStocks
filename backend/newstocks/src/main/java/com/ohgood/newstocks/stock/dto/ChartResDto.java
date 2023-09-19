package com.ohgood.newstocks.stock.dto;


import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class ChartResDto {

    private String name;
    private List<ChartSeriesDto> series;

    @Builder
    public ChartResDto(String name, List<ChartSeriesDto> series) {
        this.name = name;
        this.series = series;
    }
}
