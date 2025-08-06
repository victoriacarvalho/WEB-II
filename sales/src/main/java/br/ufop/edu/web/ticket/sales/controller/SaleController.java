package br.ufop.edu.web.ticket.sales.controller;

import br.ufop.edu.web.ticket.sales.dto.SaleDTO;
import br.ufop.edu.web.ticket.sales.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; 
import br.ufop.edu.web.ticket.sales.dto.UpdateSaleStatusDTO;

@RestController
@RequestMapping("/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public ResponseEntity<List<SaleDTO>> getAllSales() {
        List<SaleDTO> sales = saleService.getAllSales();
        return ResponseEntity.ok(sales);
    }

    @PostMapping
    public ResponseEntity<SaleDTO> createSale(@RequestBody SaleDTO saleDTO) {
        return ResponseEntity.ok(saleService.createSale(saleDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleDTO> getSaleById(@PathVariable Integer id) {
        SaleDTO saleDTO = saleService.getSaleById(id);
        return saleDTO != null ? ResponseEntity.ok(saleDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Integer id) {
        saleService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SaleDTO> updateSaleStatus(@PathVariable Integer id, @RequestBody UpdateSaleStatusDTO statusDTO) {
        SaleDTO updatedSale = saleService.updateSaleStatus(id, statusDTO);
        return ResponseEntity.ok(updatedSale);
    }
}