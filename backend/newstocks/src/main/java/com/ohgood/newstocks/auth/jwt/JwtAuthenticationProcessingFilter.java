package com.ohgood.newstocks.auth.jwt;

import com.ohgood.newstocks.auth.jwt.service.JwtService;
import com.ohgood.newstocks.global.exception.exceptions.UnAuthorizedException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws UnAuthorizedException {
        try {
            String jwt = resolveToken(request); //request에서 jwt 토큰을 꺼낸다.
            jwt = jwt != null ? jwt : ""; // 토큰이 없을 경우 빈 문자열 반환

            if (jwt=="" || jwt==null) {
                System.out.println("토큰 없음");
                throw new UnAuthorizedException();
            }

            System.out.println("jwt = " + jwt); //test

            if (StringUtils.isNotEmpty(jwt) && jwtService.checkToken(jwt)) {
                Authentication authentication = jwtService.getAuthentication(jwt); // 저장한 authentication 획득

                // Security 세션에서 계속 사용하기 위해 SecurityContext에 Authentication 등록
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // JWT에서 가져온 사용자 정보와 저장한 Authentication의 사용자 정보 비교
                if (isTokenUserInfoMatching(authentication, jwt)) {
                    filterChain.doFilter(request, response); // 사용자 정보가 일치하면 요청 계속 진행
                } else {
                    // 사용자 정보 불일치 시 처리
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Unauthorized: Token user info does not match.");
                }
            }
            else {
                if (StringUtils.isEmpty(jwt)) {
                    request.setAttribute("unauthorization", "401 인증키 없음.");
                }

                if (jwtService.checkToken(jwt)) {
                    request.setAttribute("unauthorization", "401-001 인증키 만료.");
                }
            }
        } catch (Exception ex) {
            logger.error("Security Context에 해당 토큰을 등록할 수 없습니다", ex);
            throw new UnAuthorizedException();
        }
        return;
    }

    private boolean isTokenUserInfoMatching(Authentication authentication, String jwt) {
        return false;
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("access-token");
        //Prefix 로 Bearer 가 있으면 제거
        if (StringUtils.isNotEmpty(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring("Bearer ".length());
        }
        //Prefix 가 없으면 그대로
        return bearerToken;
    }
}
