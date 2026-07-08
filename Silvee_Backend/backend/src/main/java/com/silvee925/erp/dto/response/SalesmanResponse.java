package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SalesmanResponse(
        Long id,
        String salesmanCode,
        String name,
        String phone,
        String email,
        String territory,
        BigDecimal monthlyTarget,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
