package com.example.verifycertificate.controller;

import com.example.verifycertificate.model.Ticket;
import com.example.verifycertificate.payload.ApiResponse;
import com.example.verifycertificate.payload.TicketRequest;
import com.example.verifycertificate.repository.TicketRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/v1")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;
    @PostMapping("/ticket")
        public ResponseEntity<?> sendTicket(@Valid @RequestBody TicketRequest ticketRequest) {
        Ticket ticket = new Ticket();
        Long maxId=ticketRepository.findById() ;

        if (maxId == null) {
            ticket.setId(1L);
        } else {
            ticket.setId(maxId + 1);
        }

        ticket.setName(ticketRequest.getName());
        ticket.setCity(ticketRequest.getCity());
        ticket.setDob(ticketRequest.getDob());
        ticket.setCitizenId(ticketRequest.getCitizenId());
        ticket.setRegion(ticketRequest.getRegion());
        ticket.setHashData(new byte[0]);
        ticket.setSignature(new byte[0]);
        ticket.setVerify(false);
        ticket.setSign(false);
        ticketRepository.save(ticket);

        return ResponseEntity.ok(new ApiResponse(200, true, "success"));

    }
}
