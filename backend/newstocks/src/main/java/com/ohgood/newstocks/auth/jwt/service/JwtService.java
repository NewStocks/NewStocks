package com.ohgood.newstocks.auth.jwt.service;

import org.springframework.security.core.Authentication;

public interface JwtService {

    <T> String createAccessToken(String key, T data);

    <T> String createRefreshToken(String key, T data);

    <T> String create(String key, T data, String subject, long expir);

    Authentication get(String key);

    boolean checkToken(String jwt);

    long getMemberIdFromAccessToken(String accessToken);
}
