package com.example.verifycertificate.model;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "ticket", uniqueConstraints = {
        @UniqueConstraint(columnNames = "id")
})
public class Ticket {
    @Id
    @Column(name = "id")
    private Long id;
    @Column(name="name")
    private String name;


    @Column(name="citizen_id")
    private String citizenId;
    @Column(name="dob")
    private LocalDate dob;
    @Column(name="region")
    private String region;
    @Column(name="city")
    private String city;
    @Column(name="hash_data")
    private byte[] hashData;
    @Column(name="signature")
    private byte[] signature;
    @Column(name="verify")
    private boolean verify;
    @Column(name="sign")
    private boolean sign;

    public byte[] getHashData() {
        return hashData;
    }

    public void setHashData(byte[] hashData) {
        this.hashData = hashData;
    }

    public byte[] getSignature() {
        return signature;
    }

    public void setSignature(byte[] signature) {
        this.signature = signature;
    }

    public boolean isVerify() {
        return verify;
    }

    public void setVerify(boolean verify) {
        this.verify = verify;
    }

    public boolean isSign() {
        return sign;
    }

    public void setSign(boolean sign) {
        this.sign = sign;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
