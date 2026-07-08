package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record FinancialYearResponse(
        Long id,
        String name,
        LocalDate startDate,
        LocalDate endDate,
        boolean activeYear,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
