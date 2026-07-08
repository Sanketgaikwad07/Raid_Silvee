package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.response.PermissionResponse;
import com.silvee925.erp.dto.response.UserResponse;
import com.silvee925.erp.entity.User;
import com.silvee925.erp.entity.UserPermission;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    public UserResponse toResponse(User user, List<UserPermission> grants) {
        List<PermissionResponse> permissions = grants == null ? List.of() : grants.stream()
                .map(g -> new PermissionResponse(g.getPermission().getModule(), g.getPermission().getAction()))
                .toList();

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.getEmployee() != null ? user.getEmployee().getEmployeeCode() : null,
                permissions,
                user.getLastLoginAt(),
                user.getCreatedAt()
        );
    }
}
