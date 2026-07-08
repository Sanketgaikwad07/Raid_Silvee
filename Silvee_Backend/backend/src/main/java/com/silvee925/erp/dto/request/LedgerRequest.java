package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.BalanceType;
import com.silvee925.erp.entity.enums.LedgerType;
import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record LedgerRequest(

        @NotBlank(message = "Ledger code is required")
        @Size(max = 20, message = "Ledger code must not exceed 20 characters")
        String ledgerCode,

        @NotBlank(message = "Ledger name is required")
        @Size(max = 100, message = "Ledger name must not exceed 100 characters")
        String name,

        @NotNull(message = "Ledger type is required")
        LedgerType ledgerType,

        @NotNull(message = "Opening balance is required")
        BigDecimal openingBalance,

        @NotNull(message = "Opening balance type is required")
        BalanceType openingBalanceType,

        @NotNull(message = "Status is required")
        Status status
) {
}
