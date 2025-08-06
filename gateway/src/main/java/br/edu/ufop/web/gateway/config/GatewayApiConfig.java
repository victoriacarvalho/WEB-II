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
            
            // Rota para o serviço de UTILIZADORES
            // Ex: /api/users/123 -> /users/123
            .route("users-service", r -> r.path("/api/users/**")
                .filters(f -> f.rewritePath("/api/users(?<segment>/?.*)", "/users${segment}"))
                .uri("lb://users-service"))
            
            // Rota para o serviço de VENDAS
            // Ex: /api/sales/123 -> /sales/123
            .route("sales-service-sales", r -> r.path("/api/sales/**")
                .filters(f -> f.rewritePath("/api/sales(?<segment>/?.*)", "/sales${segment}"))
                .uri("lb://sales-service"))

            // Rota para o serviço de EVENTOS (que está dentro do sales-service)
            // Ex: /api/events/123 -> /events/123
            .route("sales-service-events", r -> r.path("/api/events/**")
                .filters(f -> f.rewritePath("/api/events(?<segment>/?.*)", "/events${segment}"))
                .uri("lb://sales-service"))
            
            .build();
    }
}