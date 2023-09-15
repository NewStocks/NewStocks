package com.ohgood.newstocks.auth.jwt.service;

import com.ohgood.newstocks.auth.jwt.exception.UnAuthorizedException;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class JwtServiceImpl implements JwtService {

    public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    private static final String SALT = "NEWStocksSecret";

    private static final int ACCESS_TOKEN_EXPIRE_MINUTES = 1;
    private static final int REFRESH_TOKEN_EXPIRE_MINUTES = 2;

    @Override
    public <T> String createAccessToken(String key, T data) {
        return create(key, data, "access-token",
            1000 * 60 * 60 * 24 * 7 * ACCESS_TOKEN_EXPIRE_MINUTES);
    }

    @Override
    public <T> String createRefreshToken(String key, T data) {
        return create(key, data, "refresh-token",
            1000 * 60 * 60 * 24 * 7 * REFRESH_TOKEN_EXPIRE_MINUTES);
    }

    @Override
    public <T> String create(String key, T data, String subject, long expire) {
        Claims claims = Jwts.claims()
            .setSubject(subject)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expire));
        claims.put(key, data);
        return Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setClaims(claims)
            .signWith(SignatureAlgorithm.HS256, this.generateKey())
            .compact();
    }

    private byte[] generateKey() {
        byte[] key;
        key = SALT.getBytes(StandardCharsets.UTF_8);
        return key;
    }

    @Override
    public boolean checkToken(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(this.generateKey())
                .parseClaimsJws(jwt);
            logger.debug("claims: {}", claims);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public Map<String, Object> get(String key) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
            .getRequest();
        String jwt = request.getHeader("access-token");
        Jws<Claims> claims;
        try {
            claims = Jwts.parser().setSigningKey(SALT.getBytes(StandardCharsets.UTF_8)).parseClaimsJws(jwt);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new UnAuthorizedException();
        }
        Map<String, Object> value = claims.getBody();
        logger.info("value : {}", value);
        return value;
    }

    @Override
    public long getMemberNoFromAccessToken(String accessToken) {
        Jws<Claims> claims;
        try {
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(accessToken);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new UnAuthorizedException();
        }
        return claims.getBody().get("memberNo", Long.class);
    }
}
