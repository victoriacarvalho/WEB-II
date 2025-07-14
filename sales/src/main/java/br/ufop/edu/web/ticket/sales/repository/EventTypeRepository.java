package br.ufop.edu.web.ticket.sales.repository;

import br.ufop.edu.web.ticket.sales.model.EventTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventTypeRepository extends JpaRepository<EventTypeModel, Integer> {
}