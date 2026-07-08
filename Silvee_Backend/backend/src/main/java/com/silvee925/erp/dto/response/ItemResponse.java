package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ItemResponse(
        Long id,
        String itemCode,
        String name,
        Long categoryId,
        String categoryName,
        Long subCategoryId,
        String subCategoryName,
        Long unitId,
        String unitName,
        String hsnCode,
        BigDecimal purchasePrice,
        BigDecimal sellingPrice,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
