package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long>, JpaSpecificationExecutor<Warehouse> {

    boolean existsByWarehouseCodeIgnoreCase(String warehouseCode);

    boolean existsByWarehouseCodeIgnoreCaseAndIdNot(String warehouseCode, Long id);
}
