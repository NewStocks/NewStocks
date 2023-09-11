package com.ohgood.newstocks.stock.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class ChartDto extends DataDto{

    private int startPrice;
    private int endPrice;
    private int highPrice;
    private int lowPrice;
    private LocalDate date;
    private Long volume;
}
