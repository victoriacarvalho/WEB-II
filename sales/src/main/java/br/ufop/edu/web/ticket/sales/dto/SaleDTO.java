package br.ufop.edu.web.ticket.sales.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaleDTO {
    private Integer id;
    private Integer userId;
    private LocalDateTime saleDate;
    private String paymentStatus;
    private List<Integer> eventIds;
}