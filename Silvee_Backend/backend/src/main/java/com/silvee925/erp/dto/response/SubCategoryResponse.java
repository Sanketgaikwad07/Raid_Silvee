package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record SubCategoryResponse(
        Long id,
        String name,
        Long categoryId,
        String categoryName,
        String description,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
