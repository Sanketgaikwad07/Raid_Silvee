package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.PermissionAction;
import com.silvee925.erp.entity.enums.PermissionModule;
import jakarta.validation.constraints.NotNull;

public record PermissionGrantRequest(

        @NotNull(message = "Module is required")
        PermissionModule module,

        @NotNull(message = "Action is required")
        PermissionAction action
) {
}
