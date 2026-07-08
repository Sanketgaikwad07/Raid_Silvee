package com.silvee925.erp.entity;

import com.silvee925.erp.entity.enums.BalanceType;
import com.silvee925.erp.entity.enums.LedgerType;
import com.silvee925.erp.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(
    name = "ledgers",
    indexes = @Index(name = "idx_ledger_status", columnList = "status")
)
public class Ledger extends BaseEntity {

    @Column(name = "ledger_code", nullable = false, unique = true, length = 20)
    private String ledgerCode;

    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "ledger_type", nullable = false, length = 30)
    private LedgerType ledgerType;

    @Column(name = "opening_balance", nullable = false, precision = 12, scale = 2)
    private BigDecimal openingBalance = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "opening_balance_type", nullable = false, length = 10)
    private BalanceType openingBalanceType = BalanceType.DEBIT;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status = Status.ACTIVE;
}
