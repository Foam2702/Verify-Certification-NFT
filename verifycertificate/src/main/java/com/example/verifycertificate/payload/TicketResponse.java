package com.example.verifycertificate.payload;

import com.example.verifycertificate.model.Ticket;

public class TicketResponse {
    private boolean success;
    private int code;
    private String message;
    private Ticket ticket;

    public TicketResponse(boolean success, int code, String message, Ticket ticket){
        this.success=success;
        this.code=code;
        this.message=message;
        this.ticket = ticket;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }
}
