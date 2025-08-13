package br.edu.ufop.web.ticket.sales.model;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_events")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private Integer eventTypeId; // Alterado de Enum para Integer para simplicidade
    
    @Column(nullable = false)
    private LocalDateTime eventDate; // Nome corrigido

    @Column(name = "sales_start_date")
    private LocalDateTime salesStartDate; // Nome corrigido

    @Column(name = "sales_end_date")
    private LocalDateTime salesEndDate; // Nome corrigido
    
    @Column(name = "ticket_price", nullable = false)
    private Float ticketPrice; // Nome corrigido

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void antesGravar() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void antesAtualizar(){
        this.updatedAt = LocalDateTime.now();
    }    
}