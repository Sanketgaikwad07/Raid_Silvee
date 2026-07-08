package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record UnitResponse(
        Long id,
        String name,
        String abbreviation,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
