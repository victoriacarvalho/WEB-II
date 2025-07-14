package br.ufop.edu.web.ticket.sales.repository;

import br.ufop.edu.web.ticket.sales.model.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<SaleModel, Integer> {
}