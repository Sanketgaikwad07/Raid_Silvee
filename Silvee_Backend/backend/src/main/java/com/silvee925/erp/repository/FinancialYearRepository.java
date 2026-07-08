package com.silvee925.erp.repository;

import com.silvee925.erp.entity.FinancialYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FinancialYearRepository extends JpaRepository<FinancialYear, Long>, JpaSpecificationExecutor<FinancialYear> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);

    java.util.Optional<FinancialYear> findByActiveYearTrue();
}
