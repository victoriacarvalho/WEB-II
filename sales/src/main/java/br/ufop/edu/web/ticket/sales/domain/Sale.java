package br.ufop.edu.web.ticket.sales.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Sale {

    private Integer id;
    private Integer userId;
    private LocalDateTime saleDate;
    private String paymentStatus;
}