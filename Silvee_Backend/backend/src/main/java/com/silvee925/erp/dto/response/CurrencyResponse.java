package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record CurrencyResponse(
        Long id,
        String code,
        String name,
        String symbol,
        Integer decimalPlaces,
        boolean defaultCurrency,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
