package br.edu.ufop.web.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayApiConfig {

    @Value("${gateway.frontend.uri:http://localhost:5173}")
    private String uriFrontendService;

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()
            // Rota para buscar as redes de cartões (NOVO)
            .route("ccn-service", r -> r.path("/api/ccn/**")
                .filters(f -> f.rewritePath("/api/ccn(?<segment>/?.*)", "/ccn${segment}"))
                .uri("lb://USERS-SERVICE"))

            // Rota para os Utilizadores
            .route("users-service", r -> r.path("/api/users/**")
                .filters(f -> f.rewritePath("/api/users(?<segment>/?.*)", "/users${segment}"))
                .uri("lb://USERS-SERVICE"))

            // Rota para os Eventos (aponta para o sales-service)
            .route("sales-service-events", r -> r.path("/api/events/**")
                .filters(f -> f.rewritePath("/api/events(?<segment>/?.*)", "/sales/events${segment}"))
                .uri("lb://SALES-SERVICE"))

            // Rota para as Vendas
            .route("sales-service-sales", r -> r.path("/api/sales/**")
                .filters(f -> f.rewritePath("/api/sales(?<segment>/?.*)", "/sales${segment}"))
                .uri("lb://SALES-SERVICE"))

            // Rota para as Notificações
            .route("notifications-service", r -> r.path("/api/notifications/**")
                .filters(f -> f.rewritePath("/api/notifications(?<segment>/?.*)", "/notifications${segment}"))
                .uri("lb://NOTIFICATIONS-SERVICE"))
                
            .build();
    }
}