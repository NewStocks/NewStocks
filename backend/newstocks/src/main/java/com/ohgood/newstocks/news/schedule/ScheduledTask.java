package com.ohgood.newstocks.news.schedule;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduledTask {

    @Value("${INSERT_NEWS_URI}")
    private String INSERT_NEWS_URI;

//    @Scheduled(cron = "*/10 * * * * *") 10초마다 적용
    @Scheduled(cron = "0 0 0 * * *")
    public void updateNewsList() {
        log.info("들어온거 확인");
        // 빈 요청 본문(body)
        String requestBody = "";

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 엔티티 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // RestTemplate 인스턴스 생성
        RestTemplate restTemplate = new RestTemplate();

        // POST 요청 보내기
        try {
            restTemplate.exchange(INSERT_NEWS_URI, HttpMethod.POST, requestEntity, String.class);
        } catch (HttpStatusCodeException e) {
            e.printStackTrace();
        }
    }
}
