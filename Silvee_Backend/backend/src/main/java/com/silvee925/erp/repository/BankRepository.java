package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BankRepository extends JpaRepository<Bank, Long>, JpaSpecificationExecutor<Bank> {

    boolean existsByAccountNoIgnoreCase(String accountNo);

    boolean existsByAccountNoIgnoreCaseAndIdNot(String accountNo, Long id);
}
