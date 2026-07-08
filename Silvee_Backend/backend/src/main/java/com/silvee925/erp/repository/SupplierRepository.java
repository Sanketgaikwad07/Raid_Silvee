package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SupplierRepository extends JpaRepository<Supplier, Long>, JpaSpecificationExecutor<Supplier> {

    boolean existsBySupplierCodeIgnoreCase(String supplierCode);

    boolean existsBySupplierCodeIgnoreCaseAndIdNot(String supplierCode, Long id);
}
