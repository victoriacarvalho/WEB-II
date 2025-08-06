package br.edu.ufop.web.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayApiConfig {
    
    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {

        return builder.routes()
            // Rota para o serviço de utilizadores
            .route("users-service", r -> r.path("/api/users/**")
                .filters(f -> f.rewritePath("/api/users(?<segment>/?.*)", "/users${segment}"))
                .uri("lb://users-service"))
            
            // Rota para o serviço de vendas
            .route("sales-service", r -> r.path("/api/sales/**", "/api/events/**")
                .filters(f -> f.rewritePath("/api/(?<service>sales|events)(?<segment>/?.*)", "/${service}${segment}"))
                .uri("lb://sales-service"))
            
            .build();
    }
}