package com.ohgood.newstocks.auth.jwt.service;

import com.ohgood.newstocks.auth.jwt.dto.JwtDto;
import com.ohgood.newstocks.global.exception.exceptions.UnAuthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService {

    public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

    @Value("${SALT}")
    private String SALT;

    private static final int ACCESS_TOKEN_EXPIRE_MINUTES = 1;
    private static final int REFRESH_TOKEN_EXPIRE_MINUTES = 2;

    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    public String createAccessToken(JwtDto jwtDto) {
        return create(jwtDto, "access-token",
            1000 * 60 * 60 * 24 * 7 * ACCESS_TOKEN_EXPIRE_MINUTES);
    }

    @Override
    public String createRefreshToken(JwtDto jwtDto) {
        return create(jwtDto, "refresh-token",
            1000 * 60 * 60 * 24 * 7 * REFRESH_TOKEN_EXPIRE_MINUTES);
    }

    @Override
    public String create(JwtDto jwtDto, String subject, long expire) {
        final String encodeKey = Base64.getEncoder().encodeToString(SALT.getBytes());
        Claims claims = Jwts.claims()
            .setSubject(subject)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expire));
        claims.put("memberId", jwtDto.getId());
        claims.put("memberName", jwtDto.getName());
        claims.put("role", jwtDto.getRole());
        System.out.println("토큰 생성 중!!!");
        System.out.println(jwtDto.getId());
        System.out.println(claims);
//        UserDetails userDetails = User.builder()
//            .username(jwtDto.getMemberName())
//            .password(jwtDto.getMemberName() + SALT)
//            .build();
//        Authentication authentication = new UsernamePasswordAuthenticationToken(
//            userDetails, null, authoritiesMapper.mapAuthorities(userDetails.getAuthorities())
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String accessToken = Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setClaims(claims)
            .setSubject(jwtDto.getId().toString())
            .signWith(SignatureAlgorithm.HS256, encodeKey)
            .compact();
        System.out.println(accessToken);
        System.out.println("토큰 생성 완료!!!!!!");
        return accessToken;
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
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get("role") == null) {
            throw new UnAuthorizedException();
        }

        //권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get("role").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        //Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    @Override
    public Claims get(String key) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
            .getRequest();
        String jwt = request.getHeader("access-token");
        return parseClaims(jwt);
    }

    @Override
    public long getMemberIdFromAccessToken(String accessToken) {
        Jws<Claims> claims;
        try {
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(accessToken);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new UnAuthorizedException();
        }
        return claims.getBody().get("id", Long.class);
    }

    @Override
    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser()
                .setSigningKey(SALT.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(accessToken)
                .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
