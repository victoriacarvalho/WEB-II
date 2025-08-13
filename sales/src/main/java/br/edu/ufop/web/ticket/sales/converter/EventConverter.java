package br.edu.ufop.web.ticket.sales.converter;

import br.edu.ufop.web.ticket.sales.dtos.events.CreateEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.EventDTO;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EventConverter {

    public static EventModel toModel(CreateEventDTO dto) {
        return EventModel.builder()
            .description(dto.getDescription())
            .eventTypeId(dto.getEventTypeId())
            .eventDate(dto.getEventDate())
            .salesStartDate(dto.getSalesStartDate())
            .salesEndDate(dto.getSalesEndDate())
            .ticketPrice(dto.getTicketPrice())
            .build();
    }

    public static EventDTO toDTO(EventModel model) {
        return EventDTO.builder()
            .id(model.getId())
            .description(model.getDescription())
            .eventTypeId(model.getEventTypeId())
            .eventDate(model.getEventDate())
            .salesStartDate(model.getSalesStartDate())
            .salesEndDate(model.getSalesEndDate())
            .ticketPrice(model.getTicketPrice())
            .createdAt(model.getCreatedAt())
            .updatedAt(model.getUpdatedAt())
            .build();
    }
}