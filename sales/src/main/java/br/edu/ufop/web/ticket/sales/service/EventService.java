package br.edu.ufop.web.ticket.sales.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import br.edu.ufop.web.ticket.sales.converter.EventConverter;
import br.edu.ufop.web.ticket.sales.dtos.events.CreateEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.EventDTO;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.repositories.IEventRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventService {
    
    private final IEventRepository eventRepository;

    public List<EventDTO> getAll() {
        return eventRepository.findAll().stream()
            .map(EventConverter::toDTO)
            .collect(Collectors.toList());
    }

    public EventDTO create(CreateEventDTO createEventDTO) {
        EventModel eventModel = EventConverter.toModel(createEventDTO);
        
        EventModel savedModel = eventRepository.save(eventModel);
        
        return EventConverter.toDTO(savedModel);
    }
}