package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record CategoryResponse(
        Long id,
        String name,
        String type,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
