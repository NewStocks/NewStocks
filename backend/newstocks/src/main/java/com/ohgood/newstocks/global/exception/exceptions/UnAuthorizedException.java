package com.ohgood.newstocks.global.exception.exceptions;

import com.ohgood.newstocks.global.exception.NewStocksApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnAuthorizedException extends NewStocksApiException {
    public UnAuthorizedException() {
        super(HttpStatus.UNAUTHORIZED,"계정 권한이 유효하지 않습니다.\n다시 로그인을 해주세요.");
    }
}
