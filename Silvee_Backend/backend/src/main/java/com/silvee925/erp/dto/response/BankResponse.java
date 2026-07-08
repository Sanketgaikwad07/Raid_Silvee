package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record BankResponse(
        Long id,
        String bankName,
        String branch,
        String accountHolderName,
        String accountNo,
        String ifscCode,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
