package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.RoleType;

import java.time.LocalDateTime;
import java.util.List;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        RoleType role,
        boolean active,
        String employeeCode,
        List<PermissionResponse> permissions,
        LocalDateTime lastLoginAt,
        LocalDateTime createdAt
) {
}
