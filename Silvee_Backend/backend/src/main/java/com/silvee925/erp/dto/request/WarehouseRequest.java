package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record WarehouseRequest(

        @NotBlank(message = "Warehouse code is required")
        @Size(max = 20, message = "Warehouse code must not exceed 20 characters")
        String warehouseCode,

        @NotBlank(message = "Warehouse name is required")
        @Size(max = 100, message = "Warehouse name must not exceed 100 characters")
        String name,

        @Size(max = 200, message = "Location must not exceed 200 characters")
        String location,

        @Min(value = 0, message = "Capacity cannot be negative")
        Integer capacity,

        boolean defaultWarehouse,

        @NotNull(message = "Status is required")
        Status status
) {
}
