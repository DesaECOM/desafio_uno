package com.test.evol.customer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findCustomerByRbd(String rbd);

    @Query("SELECT c FROM Customer c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%')) ESCAPE '!'")
    List<Customer> findCustomersByName(@Param("name") String name);

    @Query("SELECT c FROM Customer c WHERE LOWER(c.rbd) LIKE LOWER(CONCAT('%', :rbd, '%')) ESCAPE '!'")
    List<Customer> findByRbdContaining(@Param("rbd") String rbd);

    @Query("SELECT c FROM Customer c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.rbd) LIKE LOWER(CONCAT('%', :search, '%')) ESCAPE '!'")
    List<Customer> findCustomersByNameOrRbd(@Param("search") String search);
}