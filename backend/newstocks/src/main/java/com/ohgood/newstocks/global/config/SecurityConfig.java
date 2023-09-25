package com.ohgood.newstocks.global.config;


import static org.springframework.security.config.Customizer.withDefaults;

import com.ohgood.newstocks.auth.jwt.JwtAuthenticationProcessingFilter;
import com.ohgood.newstocks.auth.jwt.service.JwtService;
import com.ohgood.newstocks.member.repository.MemberRepository;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    //라이라이 차차차, antMatcher, csrf가 deprecated되어버렸기에 열심히
    //velog, stackoverflow를 뒤져 만드는 중임무황태
    //https://stackoverflow.com/questions/74753700/cannot-resolve-method-antmatchers-in-authorizationmanagerrequestmatcherregis
    //https://velog.io/@letsdev/Spring-Boot-3.1Spring-6.1-Security-Config-csrf-is-deprecated-and-marked-for-removal

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(requests -> requests
                .requestMatchers("/other-endpoint").hasRole("SOME_ROLE") // Another endpoint with a single role requirement
                .anyRequest().permitAll()
            )
            .formLogin(withDefaults()); // 기본 로그인을 비활성화하고자 할 때 .formLogin(withDefaults())를 사용
        http.addFilterAfter(jwtAuthenticationProcessingFilter(), LogoutFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager noopAuthenticationManager() {
        return authentication -> {
            throw new AuthenticationServiceException("Authentication is disabled");
        };
    }

    private Filter jwtAuthenticationProcessingFilter() {
        JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService);
        return jwtAuthenticationFilter;
    }


}

