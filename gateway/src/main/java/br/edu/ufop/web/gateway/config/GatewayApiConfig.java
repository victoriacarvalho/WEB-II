package br.edu.ufop.web.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayApiConfig {

    @Value("${gateway.frontend.uri}")
    private String uriFrontendService = "http://localhost:1234";

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {

        return builder.routes()
            .route("users-api",
                p -> p.path("/api/users/**")
                .filters(f -> f.rewritePath("/api/users(?<segment>/?.*)", "/users${segment}"))
                .uri("lb://users-service")
            )
            .route("events-api",
                p -> p.path("/api/events/**")
                .filters(f -> f.rewritePath("/api/events(?<segment>/?.*)", "/events${segment}"))
                .uri("lb://sales-service")
            )
            .route("sales-api",
                p -> p.path("/api/sales/**")
                .filters(f -> f.rewritePath("/api/sales(?<segment>/?.*)", "/sales${segment}"))
                .uri("lb://sales-service")
            )
            .route("notifications",
                p -> p.path("/notifications/**")
                .uri("lb://notifications-service")
            )
            .route("frontend",
                p -> p.path("/**")
                .uri(this.uriFrontendService)
            )
            .build();
    }
}