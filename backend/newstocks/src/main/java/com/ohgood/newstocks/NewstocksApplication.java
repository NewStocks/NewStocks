package com.ohgood.newstocks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
//BaseTimeEntity 처리
@EnableJpaAuditing
public class NewstocksApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewstocksApplication.class, args);
	}

}
