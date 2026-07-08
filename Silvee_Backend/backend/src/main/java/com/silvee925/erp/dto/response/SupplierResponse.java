package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SupplierResponse(
        Long id,
        String supplierCode,
        String name,
        String phone,
        String email,
        String gstNo,
        String addressLine1,
        String city,
        String state,
        String pincode,
        BigDecimal openingBalance,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
