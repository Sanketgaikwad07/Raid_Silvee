package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Salesman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SalesmanRepository extends JpaRepository<Salesman, Long>, JpaSpecificationExecutor<Salesman> {

    boolean existsBySalesmanCodeIgnoreCase(String salesmanCode);

    boolean existsBySalesmanCodeIgnoreCaseAndIdNot(String salesmanCode, Long id);
}
