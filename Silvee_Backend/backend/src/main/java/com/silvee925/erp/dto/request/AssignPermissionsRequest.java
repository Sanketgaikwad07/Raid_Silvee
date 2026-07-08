package com.silvee925.erp.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AssignPermissionsRequest(

        @NotNull(message = "Permissions list is required (send an empty list to revoke all)")
        List<@Valid PermissionGrantRequest> permissions
) {
}
