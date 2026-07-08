package com.silvee925.erp.repository;

import com.silvee925.erp.entity.MeasurementUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MeasurementUnitRepository extends JpaRepository<MeasurementUnit, Long>, JpaSpecificationExecutor<MeasurementUnit> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByAbbreviationIgnoreCase(String abbreviation);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);

    boolean existsByAbbreviationIgnoreCaseAndIdNot(String abbreviation, Long id);
}
