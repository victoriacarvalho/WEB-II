package br.ufop.edu.web.ticket.sales.repository;

import br.ufop.edu.web.ticket.sales.model.EventModel;
import br.ufop.edu.web.ticket.sales.model.SaleModel;
import br.ufop.edu.web.ticket.sales.model.TicketModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<TicketModel, Integer> {

    List<TicketModel> findBySale(SaleModel sale);

    List<TicketModel> findByEvent(EventModel event);
}