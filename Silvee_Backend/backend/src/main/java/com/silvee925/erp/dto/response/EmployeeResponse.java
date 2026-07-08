package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record EmployeeResponse(
        Long id,
        String employeeCode,
        String fullName,
        String designation,
        String phone,
        String email,
        boolean hasUserAccount,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
