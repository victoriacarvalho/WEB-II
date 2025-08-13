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
            // Rota para o User Service
            .route("users-service", r -> r.path("/api/users/**")
                .filters(f -> f.rewritePath("/api/users(?<segment>/?.*)", "/users${segment}"))
                .uri("lb://USERS-SERVICE"))

            // Rota para o Sales Service (para os endpoints de /events)
            .route("sales-service-events", r -> r.path("/api/events/**")
                .filters(f -> f.rewritePath("/api/events(?<segment>/?.*)", "/sales/events${segment}"))
                .uri("lb://SALES-SERVICE"))

            // Rota para o Sales Service (para os endpoints de /sales)
            .route("sales-service-sales", r -> r.path("/api/sales/**")
                .filters(f -> f.rewritePath("/api/sales(?<segment>/?.*)", "/sales${segment}"))
                .uri("lb://SALES-SERVICE"))

            // Rota para o Notifications Service
            .route("notifications-service", r -> r.path("/api/notifications/**")
                .filters(f -> f.rewritePath("/api/notifications(?<segment>/?.*)", "/notifications${segment}"))
                .uri("lb://NOTIFICATIONS-SERVICE"))

            // Rota de fallback para o Frontend (deve ser a última)
            .route("frontend", r -> r.path("/**")
                .uri(uriFrontendService))
            .build();
    }
}