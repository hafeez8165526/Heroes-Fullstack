package com.hafeez;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class HeroMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeroMicroserviceApplication.class, args);
	}

}
