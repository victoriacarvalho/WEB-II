package br.ufop.edu.web.ticket.user.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EnumUserType {
    //Cliente - comprar
    //Empresa - organiza eventos
    //Administrador - gerenciar eventos, organizadoras e clientes

    CUSTOMER(1, "Cliente"),
    ENTERPRISE(2, "Empresa"),
    ADMIN(3, "Administrador");

    private Integer id;
    private String description;
}
