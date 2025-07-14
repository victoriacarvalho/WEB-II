package br.ufop.edu.web.ticket.sales.service;

import br.ufop.edu.web.ticket.sales.dto.SaleDTO;
import br.ufop.edu.web.ticket.sales.model.EventModel;
import br.ufop.edu.web.ticket.sales.model.SaleModel;
import br.ufop.edu.web.ticket.sales.model.TicketModel;
import br.ufop.edu.web.ticket.sales.repository.EventRepository;
import br.ufop.edu.web.ticket.sales.repository.SaleRepository;
import br.ufop.edu.web.ticket.sales.repository.TicketRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;

    public SaleService(SaleRepository saleRepository, TicketRepository ticketRepository, EventRepository eventRepository) {
        this.saleRepository = saleRepository;
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
    }

    public SaleDTO createSale(SaleDTO saleDTO) {
        SaleModel saleModel = new SaleModel();
        BeanUtils.copyProperties(saleDTO, saleModel);
        saleModel.setSaleDate(LocalDateTime.now());
        saleModel = saleRepository.save(saleModel);

        for (Integer eventId : saleDTO.getEventIds()) {
            Optional<EventModel> eventModel = eventRepository.findById(eventId);
            if(eventModel.isPresent()) {
                TicketModel ticketModel = new TicketModel();
                ticketModel.setSale(saleModel);
                ticketModel.setEvent(eventModel.get());
                ticketRepository.save(ticketModel);
            }
        }

        SaleDTO createdSale = new SaleDTO();
        BeanUtils.copyProperties(saleModel, createdSale);
        return createdSale;
    }

    public SaleDTO getSaleById(Integer id) {
        Optional<SaleModel> saleModel = saleRepository.findById(id);
        if (saleModel.isPresent()) {
            SaleDTO saleDTO = new SaleDTO();
            BeanUtils.copyProperties(saleModel.get(), saleDTO);
            return saleDTO;
        }
        return null;
    }

     public void deleteSale(Integer id) {
        Optional<SaleModel> saleOptional = saleRepository.findById(id);
        if (saleOptional.isPresent()) {
            SaleModel sale = saleOptional.get();

            List<TicketModel> tickets = ticketRepository.findBySale(sale);
            ticketRepository.deleteAll(tickets);

            saleRepository.delete(sale);
        }
    }
}