package com.example.verifycertificate.repository;

import com.example.verifycertificate.model.Ticket;
import org.springframework.data.jpa.repository.*;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
    Optional<Ticket> findByid(Long id);
    @Query("SELECT DISTINCT c.id FROM Ticket c WHERE c.id=(SELECT MAX(c.id) FROM Ticket c)")
    Long findById();
}
