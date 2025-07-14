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
public class Event {

    private Integer id;
    private String eventType;
    private String description;
    private LocalDateTime eventDate;
    private LocalDateTime salesStartDate;
    private LocalDateTime salesEndDate;
    private Double ticketPrice;
}