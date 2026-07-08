package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    boolean existsByItemCodeIgnoreCase(String itemCode);

    boolean existsByItemCodeIgnoreCaseAndIdNot(String itemCode, Long id);

    boolean existsByCategoryId(Long categoryId);

    boolean existsBySubCategoryId(Long subCategoryId);

    boolean existsByUnitId(Long unitId);
}
