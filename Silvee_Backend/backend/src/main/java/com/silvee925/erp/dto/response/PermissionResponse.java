package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.PermissionAction;
import com.silvee925.erp.entity.enums.PermissionModule;

public record PermissionResponse(
        PermissionModule module,
        PermissionAction action
) {
}
