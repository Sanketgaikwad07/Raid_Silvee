package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {

    boolean existsByCompanyCodeIgnoreCase(String companyCode);

    boolean existsByGstNoIgnoreCase(String gstNo);

    boolean existsByCompanyCodeIgnoreCaseAndIdNot(String companyCode, Long id);

    boolean existsByGstNoIgnoreCaseAndIdNot(String gstNo, Long id);
}
