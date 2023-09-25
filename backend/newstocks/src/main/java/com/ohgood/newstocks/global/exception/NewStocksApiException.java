package com.ohgood.newstocks.global.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;


@EqualsAndHashCode(callSuper = false)
@Data
public class NewStocksApiException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String reason;

    public NewStocksApiException(HttpStatus httpStatus, String reason) {
        super(reason);
        this.httpStatus = httpStatus;
        this.reason = reason;
    }
}
