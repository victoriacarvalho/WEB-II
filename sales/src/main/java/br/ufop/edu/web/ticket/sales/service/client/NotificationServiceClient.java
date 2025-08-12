package br.ufop.edu.web.ticket.sales.service.client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("notifications-service")
public interface NotificationServiceClient {
    
    @PostMapping("/notifications")
    public String create(@RequestBody);
}
