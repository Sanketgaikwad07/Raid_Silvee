package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ItemRequest(

        @NotBlank(message = "Item code is required")
        @Size(max = 30, message = "Item code must not exceed 30 characters")
        String itemCode,

        @NotBlank(message = "Item name is required")
        @Size(max = 150, message = "Item name must not exceed 150 characters")
        String name,

        @NotNull(message = "Category is required")
        Long categoryId,

        Long subCategoryId,

        @NotNull(message = "Unit is required")
        Long unitId,

        // hsnCode is optional: @Pattern only special-cases null, not "", so the alternation
        // explicitly allows an empty string through for callers that send "" instead of omitting it.
        @Pattern(regexp = "^$|^[0-9]{4,8}$", message = "HSN code must be 4-8 digits")
        String hsnCode,

        @DecimalMin(value = "0.0", message = "Purchase price cannot be negative")
        BigDecimal purchasePrice,

        @NotNull(message = "Selling price is required")
        @DecimalMin(value = "0.0", message = "Selling price cannot be negative")
        BigDecimal sellingPrice,

        @NotNull(message = "Status is required")
        Status status
) {
}
