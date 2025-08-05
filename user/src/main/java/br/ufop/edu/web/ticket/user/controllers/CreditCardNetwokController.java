package br.ufop.edu.web.ticket.user.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufop.edu.web.ticket.user.dtos.creditCardNetwork.CreateCreditCardNetworkDTO;
import br.ufop.edu.web.ticket.user.dtos.creditCardNetwork.SimpleCreditCardNetworkDTO;
import br.ufop.edu.web.ticket.user.service.CreditCardNetworkService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/ccn")
@AllArgsConstructor
public class CreditCardNetwokController {

    private final CreditCardNetworkService  creditCardNetworkService;

   @GetMapping
public ResponseEntity<List<SimpleCreditCardNetworkDTO>> getAll() {
    return ResponseEntity.ok(creditCardNetworkService.getAll());
}

   @PostMapping
public ResponseEntity<SimpleCreditCardNetworkDTO> create(@RequestBody CreateCreditCardNetworkDTO createCreditCardNetworkDTO) {

    SimpleCreditCardNetworkDTO simpleCreditCardNetworkDTO = creditCardNetworkService.create(createCreditCardNetworkDTO);

    if (simpleCreditCardNetworkDTO == null) {
        return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(simpleCreditCardNetworkDTO);
}
    
}
