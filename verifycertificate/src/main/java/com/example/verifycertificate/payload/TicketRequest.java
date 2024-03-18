package com.example.verifycertificate.payload;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class TicketRequest {
    private String name;
    private String citizenId;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dob;
    private String region;
    private String city;
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(String citizenId) {
        this.citizenId = citizenId;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
