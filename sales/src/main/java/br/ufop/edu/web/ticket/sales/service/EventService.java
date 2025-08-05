package br.ufop.edu.web.ticket.sales.service;

import br.ufop.edu.web.ticket.sales.dto.EventDTO;
import br.ufop.edu.web.ticket.sales.model.EventModel;
import br.ufop.edu.web.ticket.sales.model.EventTypeModel;
import br.ufop.edu.web.ticket.sales.model.TicketModel; 
import br.ufop.edu.web.ticket.sales.repository.EventRepository;
import br.ufop.edu.web.ticket.sales.repository.EventTypeRepository;
import br.ufop.edu.web.ticket.sales.repository.TicketRepository;
import lombok.Getter;
import lombok.Setter;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventTypeRepository eventTypeRepository;
    private final TicketRepository ticketRepository; // <-- 1. DECLARAÇÃO DO CAMPO

    // 2. INJEÇÃO PELO CONSTRUTOR
    public EventService(EventRepository eventRepository, EventTypeRepository eventTypeRepository, TicketRepository ticketRepository) {
        this.eventRepository = eventRepository;
        this.eventTypeRepository = eventTypeRepository;
        this.ticketRepository = ticketRepository;
    }

    public EventDTO createEvent(EventDTO eventDTO) {
        EventModel eventModel = new EventModel();
        BeanUtils.copyProperties(eventDTO, eventModel);

        EventTypeModel eventType = eventTypeRepository.findById(eventDTO.getEventTypeId())
                .orElseThrow(() -> new RuntimeException("Event type not found with ID: " + eventDTO.getEventTypeId()));

        eventModel.setEventType(eventType);
        eventModel = eventRepository.save(eventModel);

        return convertToDTO(eventModel);
    }

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventDTO getEventById(Integer id) {
        return eventRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public EventDTO updateEvent(Integer id, EventDTO eventDTO) {
        Optional<EventModel> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            EventModel eventModel = existingEvent.get();
            BeanUtils.copyProperties(eventDTO, eventModel, "id");

            EventTypeModel eventType = eventTypeRepository.findById(eventDTO.getEventTypeId())
                    .orElseThrow(() -> new RuntimeException("Event type not found with ID: " + eventDTO.getEventTypeId()));

            eventModel.setEventType(eventType);
            eventModel = eventRepository.save(eventModel);

            return convertToDTO(eventModel);
        }
        return null;
    }

    @Transactional
    public void deleteEvent(Integer id) {
        EventModel event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + id));

        // 3. USO DA INSTÂNCIA CORRETA
        List<TicketModel> ticketsToDelete = this.ticketRepository.findByEvent(event);

        if (!ticketsToDelete.isEmpty()) {
            this.ticketRepository.deleteAll(ticketsToDelete);
        }

        eventRepository.deleteById(id);
    }

    private EventDTO convertToDTO(EventModel eventModel) {
        EventDTO eventDTO = new EventDTO();
        BeanUtils.copyProperties(eventModel, eventDTO);
        if (eventModel.getEventType() != null) {
            eventDTO.setEventTypeId(eventModel.getEventType().getId());
        }
        return eventDTO;
    }
}