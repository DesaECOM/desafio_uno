package com.test.evol.currentMeter;

import com.test.evol.customer.Customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "current_meters")
public class CurrentMeter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String physicalaAddress;
    private String installationNumber;
    /* private Number customerId; */
    @Column(unique = true)
    private String evolId;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public CurrentMeter() {
    }

    public CurrentMeter(Long id, String physicalaAddress, String installationNumber, Number customerId,
            String evolId) {
        this.id = id;
        this.physicalaAddress = physicalaAddress;
        this.installationNumber = installationNumber;
        // this.customerId = customerId;
        this.evolId = evolId;
    }

    public CurrentMeter(String physicalaAddress, String installationNumber, Number customerId, String evolId) {
        this.physicalaAddress = physicalaAddress;
        this.installationNumber = installationNumber;
        // this.customerId = customerId;
        this.evolId = evolId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhysicalaAddress() {
        return physicalaAddress;
    }

    public void setPhysicalaAddress(String physicalaAddress) {
        this.physicalaAddress = physicalaAddress;
    }

    public String getInstallationNumber() {
        return installationNumber;
    }

    public void setInstallationNumber(String installationNumber) {
        this.installationNumber = installationNumber;
    }

    public String getEvolId() {
        return evolId;
    }

    public void setEvolId(String evolId) {
        this.evolId = evolId;
    }
}
