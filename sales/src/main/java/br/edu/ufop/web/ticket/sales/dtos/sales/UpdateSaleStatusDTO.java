package br.edu.ufop.web.ticket.sales.dtos.sales;

import br.edu.ufop.web.ticket.sales.enums.EnumSaleStatusType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSaleStatusDTO {
    private EnumSaleStatusType saleStatus;
}