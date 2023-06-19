package com.test.evol.customer;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public ResponseEntity<Object> createCustomer(Customer customer) {
        Optional<Customer> res = customerRepository.findCustomerByRbd(customer.getRbd());
        HashMap<String, Object> data = new HashMap<>();

        if (res.isPresent() && customer.getId() == null) {
            data.put("error", true);
            data.put("message", "Ya existe el Rbd del cliente");

            return new ResponseEntity<>(
                    data,
                    HttpStatus.CONFLICT);
        }

        data.put("data", customer);
        data.put("message", "Se agrego un nuevo registro");

        if (customer.getId() != null) {
            data.put("message", "Se actualizaron los registros");
        }

        customerRepository.save(customer);

        return new ResponseEntity<>(
                data,
                HttpStatus.CREATED);
    }

    public ResponseEntity<Object> deleteCustomer(Long id) {
        boolean exists = this.customerRepository.existsById(id);
        HashMap<String, Object> data = new HashMap<>();

        if (!exists) {
            data.put("error", true);
            data.put("message", "No existe un cliente con est id");

            return new ResponseEntity<>(
                    data,
                    HttpStatus.CONFLICT);
        }

        customerRepository.deleteById(id);

        data.put("message", "Cliente eliminado");

        return new ResponseEntity<>(
                data,
                HttpStatus.ACCEPTED);

    }

    public List<Customer> getCustomersByName(String name) {
        return customerRepository.findCustomersByName(name);
    }

    public List<Customer> getCustomersByNameOrRbd(String search) {
        return customerRepository.findCustomersByNameOrRbd(search);
    }
}
