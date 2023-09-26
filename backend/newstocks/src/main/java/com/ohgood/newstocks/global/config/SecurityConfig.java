package com.ohgood.newstocks.global.config;


import com.ohgood.newstocks.auth.jwt.JwtAccessDeniedHandler;
import com.ohgood.newstocks.auth.jwt.JwtAuthenticationEntryPoint;
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
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    //라이라이 차차차, antMatcher, csrf가 deprecated되어버렸기에 열심히
    //velog, stackoverflow를 뒤져 만드는 중임무황태
    //https://stackoverflow.com/questions/74753700/cannot-resolve-method-antmatchers-in-authorizationmanagerrequestmatcherregis
    //https://velog.io/@letsdev/Spring-Boot-3.1Spring-6.1-Security-Config-csrf-is-deprecated-and-marked-for-removal

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(
                jwtAuthenticationEntryPoint).accessDeniedHandler(jwtAccessDeniedHandler))
            .httpBasic(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(requests -> requests
//                .requestMatchers("/stock/**").permitAll()
//                .requestMatchers("/notice/**").hasAuthority("SOME_ROLE")
//                .requestMatchers("/review-note/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterAfter(jwtAuthenticationProcessingFilter(),
                UsernamePasswordAuthenticationFilter.class)
            .headers(headers -> headers.frameOptions(FrameOptionsConfig::disable));
        return http.build();
    }

    @Bean
    public AuthenticationManager noopAuthenticationManager() {
        return authentication -> {
            throw new AuthenticationServiceException("Authentication is disabled");
        };
    }

    private Filter jwtAuthenticationProcessingFilter() {
        return new JwtAuthenticationProcessingFilter(jwtService);
    }
}

