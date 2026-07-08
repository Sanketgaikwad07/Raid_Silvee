package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TaxRepository extends JpaRepository<Tax, Long>, JpaSpecificationExecutor<Tax> {

    boolean existsByCodeIgnoreCase(String code);

    boolean existsByCodeIgnoreCaseAndIdNot(String code, Long id);
}
