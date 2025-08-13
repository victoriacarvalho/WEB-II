package br.edu.ufop.web.ticket.sales.converter;

import br.edu.ufop.web.ticket.sales.dtos.sales.SaleDTO;
import br.edu.ufop.web.ticket.sales.enums.EnumSaleStatusType;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.model.SaleModel;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SalesConverter {

    public static SaleModel toModel(EventModel event, java.util.UUID userId) {
        return SaleModel.builder()
            .userId(userId)
            .eventModel(event)
            .saleDate(LocalDateTime.now())
            .saleStatus(EnumSaleStatusType.PAGO)
            .build();
    }

    public static SaleDTO toDTO(SaleModel saleModel) {
        return SaleDTO.builder()
            .id(saleModel.getId())
            .userId(saleModel.getUserId())
            .eventDTO(EventConverter.toDTO(saleModel.getEventModel()))
            .saleDate(saleModel.getSaleDate())
            .saleStatus(saleModel.getSaleStatus())
            .createdAt(saleModel.getCreatedAt())
            .updatedAt(saleModel.getUpdatedAt())
            .build();
    }
}