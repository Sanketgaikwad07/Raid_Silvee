package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CustomerRepository extends JpaRepository<Customer, Long>, JpaSpecificationExecutor<Customer> {

    boolean existsByCustomerCodeIgnoreCase(String customerCode);

    boolean existsByCustomerCodeIgnoreCaseAndIdNot(String customerCode, Long id);
}
