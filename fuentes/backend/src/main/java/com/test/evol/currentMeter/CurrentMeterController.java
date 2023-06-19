package com.test.evol.currentMeter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.evol.customer.Customer;
import com.test.evol.customer.CustomerRepository;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping(path = "api/v1/current-meter")
public class CurrentMeterController {
    private final CurrentMeterService currentMeterService;
    private final CustomerRepository customerRepository;

    @Autowired
    public CurrentMeterController(CurrentMeterService currentMeterService, CustomerRepository customerRepository) {
        this.currentMeterService = currentMeterService;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<CurrentMeter> getCurrentMeter() {
        List<CurrentMeter> currentMeters = currentMeterService.getCurrentMeter();

        // Cargar datos del cliente asignado para cada CurrentMeter
        currentMeters.forEach(currentMeter -> {
            Customer customer = currentMeter.getCustomer();
            // Aquí puedes hacer lo que necesites con los datos del cliente
        });

        return currentMeters;
    }

    @PostMapping
    public ResponseEntity<Object> createCurrentMeter(@RequestBody CurrentMeter currentMeter,
            @RequestParam Long customerId) {
        // Obtener el Customer correspondiente al customerId
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerId));

        // Establecer el Customer en el CurrentMeter
        currentMeter.setCustomer(customer);

        return this.currentMeterService.createCurrentMeter(currentMeter);
    }

    @PutMapping
    public ResponseEntity<Object> updateCurrentMeter(@RequestBody CurrentMeter CurrentMeter) {
        return this.currentMeterService.createCurrentMeter(CurrentMeter);
    }

    @DeleteMapping(path = "{CurrentMeterID}")
    public ResponseEntity<Object> deleteCurrentMeter(@PathVariable("CurrentMeterID") Long id) {
        return this.currentMeterService.deleteCurrentMeter(id);
    }

}
