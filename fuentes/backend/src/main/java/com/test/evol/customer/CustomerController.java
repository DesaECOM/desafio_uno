package com.test.evol.customer;

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

@RestController
@RequestMapping(path = "api/v1/customer")
public class CustomerController {
	private final CustomerService customerService;

	@Autowired
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@GetMapping
	public List<Customer> getCustomers(@RequestParam(required = false) String search,
			@RequestParam(required = false) String rbd) {
		// Verificar si se proporcionó el parámetro 'search' para filtrar
		List<Customer> customers;

		if (search != null) {
			customers = customerService.getCustomersByNameOrRbd(search);
		} else {
			customers = customerService.getAllCustomers();
		}

		return customers;
	}

	@PostMapping
	public ResponseEntity<Object> createCustomer(@RequestBody Customer customer) {
		return this.customerService.createCustomer(customer);
	}

	@PutMapping
	public ResponseEntity<Object> updateCustomer(@RequestBody Customer customer) {
		return this.customerService.createCustomer(customer);
	}

	@DeleteMapping(path = "{customerID}")
	public ResponseEntity<Object> deleteCustomer(@PathVariable("customerID") Long id) {
		return this.customerService.deleteCustomer(id);
	}

}
