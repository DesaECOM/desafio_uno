package com.test.evol.customer;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String rbd;

    private String companyReason;

    private LocalDate startDate;

    public Customer() {
    }

    public Customer(Long id, String name, String rbd, String companyReason, LocalDate startDate) {
        this.id = id;
        this.name = name;
        this.rbd = rbd;
        this.companyReason = companyReason;
        this.startDate = startDate;
    }

    public Customer(String name, String rbd, String companyReason, LocalDate startDate) {
        this.name = name;
        this.rbd = rbd;
        this.companyReason = companyReason;
        this.startDate = startDate;
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

    public String getRbd() {
        return rbd;
    }

    public void setRbd(String rbd) {
        this.rbd = rbd;
    }

    public String getCompanyReason() {
        return companyReason;
    }

    public void setCompanyReason(String companyReason) {
        this.companyReason = companyReason;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
}
