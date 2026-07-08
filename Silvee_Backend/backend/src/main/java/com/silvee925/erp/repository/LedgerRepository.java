package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LedgerRepository extends JpaRepository<Ledger, Long>, JpaSpecificationExecutor<Ledger> {

    boolean existsByLedgerCodeIgnoreCase(String ledgerCode);

    boolean existsByNameIgnoreCase(String name);

    boolean existsByLedgerCodeIgnoreCaseAndIdNot(String ledgerCode, Long id);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
