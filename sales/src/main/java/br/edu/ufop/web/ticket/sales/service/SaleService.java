package br.edu.ufop.web.ticket.sales.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import br.edu.ufop.web.ticket.sales.converter.SalesConverter;
import br.edu.ufop.web.ticket.sales.dtos.sales.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.SaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.model.SaleModel;
import br.edu.ufop.web.ticket.sales.repositories.IEventRepository;
import br.edu.ufop.web.ticket.sales.repositories.ISalesRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SaleService {
    
    private final ISalesRepository salesRepository;
    private final IEventRepository eventRepository;

    public List<SaleDTO> getAll() {
        return salesRepository.findAll()
                .stream()
                .map(SalesConverter::toDTO)
                .collect(Collectors.toList());
    }

    public SaleDTO create(CreateSaleDTO createSaleDTO) {
        Optional<EventModel> eventOptional = eventRepository.findById(createSaleDTO.getEventId());
        if (eventOptional.isEmpty()) {
            return null;
        }
        EventModel event = eventOptional.get();
        SaleModel saleModel = SalesConverter.toModel(event, createSaleDTO.getUserId());
        SaleModel savedSale = salesRepository.save(saleModel);
        return SalesConverter.toDTO(savedSale);
    }

    public SaleDTO updateStatus(UUID saleId, UpdateSaleStatusDTO statusDTO) {
        SaleModel saleModel = salesRepository.findById(saleId)
            .orElseThrow(() -> new RuntimeException("Venda não encontrada com o ID: " + saleId));

        saleModel.setSaleStatus(statusDTO.getSaleStatus());
        SaleModel updatedSale = salesRepository.save(saleModel);
        return SalesConverter.toDTO(updatedSale);
    }
}