package com.ohgood.newstocks.stock.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
public class ChartSeriesDto {

    private String name;
    private String type;
    private List<DataDto> data;

    @Builder
    public ChartSeriesDto(String name, String type, List<DataDto> data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }
}
