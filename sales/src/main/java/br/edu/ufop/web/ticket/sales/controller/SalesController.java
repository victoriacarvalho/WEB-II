package br.edu.ufop.web.ticket.sales.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.edu.ufop.web.ticket.sales.dtos.sales.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.SaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.service.SaleService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/sales")
@AllArgsConstructor
public class SalesController {

    private final SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleDTO>> getAllSales() {
        return ResponseEntity.ok(saleService.getAll());
    }

    @PostMapping
    public ResponseEntity<SaleDTO> create(@RequestBody CreateSaleDTO createSaleDTO) {
        SaleDTO saleDTO = saleService.create(createSaleDTO);
        if (saleDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(saleDTO);
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<SaleDTO> updateSaleStatus(@PathVariable("id") UUID id, @RequestBody UpdateSaleStatusDTO statusDTO) {
        SaleDTO updatedSale = saleService.updateStatus(id, statusDTO);
        return ResponseEntity.ok(updatedSale);
    }
}