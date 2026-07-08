package com.silvee925.erp;

import com.silvee925.erp.config.CorsProperties;
import com.silvee925.erp.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableAsync
@EnableConfigurationProperties({JwtProperties.class, CorsProperties.class})
public class SilveeErpApplication {

    public static void main(String[] args) {
        SpringApplication.run(SilveeErpApplication.class, args);
    }
}
