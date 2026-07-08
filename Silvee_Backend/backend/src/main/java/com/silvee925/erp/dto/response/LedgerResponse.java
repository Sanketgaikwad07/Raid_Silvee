package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.BalanceType;
import com.silvee925.erp.entity.enums.LedgerType;
import com.silvee925.erp.entity.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LedgerResponse(
        Long id,
        String ledgerCode,
        String name,
        LedgerType ledgerType,
        BigDecimal openingBalance,
        BalanceType openingBalanceType,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
