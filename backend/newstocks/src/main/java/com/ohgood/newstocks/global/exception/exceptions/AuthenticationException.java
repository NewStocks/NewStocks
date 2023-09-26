package com.ohgood.newstocks.global.exception.exceptions;

import com.ohgood.newstocks.global.exception.NewStocksApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AuthenticationException extends NewStocksApiException {

    public AuthenticationException(String reason) {
        super(HttpStatus.UNAUTHORIZED, reason);
    }
}