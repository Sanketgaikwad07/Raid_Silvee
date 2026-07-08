package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TaxResponse(
        Long id,
        String name,
        String code,
        BigDecimal ratePercentage,
        BigDecimal cgstPercentage,
        BigDecimal sgstPercentage,
        BigDecimal igstPercentage,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
