package com.ohgood.newstocks.global.exception.handler;

import com.ohgood.newstocks.global.exception.NewStocksApiException;
import com.ohgood.newstocks.global.exception.NewStocksApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NewStocksApiException.class)
    public ResponseEntity<NewStocksApiResponse> handleNewStocksApiException(NewStocksApiException ex) {
        HttpStatus httpStatus = ex.getHttpStatus();
        String reason = ex.getReason();

        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(
            RequestContextHolder.getRequestAttributes())).getRequest();
        String path = request.getRequestURI();

        NewStocksApiResponse response = new NewStocksApiResponse(formattedDateTime,
            httpStatus.value(), httpStatus.getReasonPhrase(), path, reason);
        return new ResponseEntity<>(response, httpStatus);
    }
}
