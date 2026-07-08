package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record CompanyResponse(
        Long id,
        String companyCode,
        String companyName,
        String legalName,
        String companyType,
        String gstNo,
        String panNo,
        String phone,
        String alternatePhone,
        String email,
        String website,
        String addressLine1,
        String addressLine2,
        String city,
        String state,
        String stateCode,
        String pincode,
        String country,
        String currency,
        String logoUrl,
        boolean defaultCompany,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
