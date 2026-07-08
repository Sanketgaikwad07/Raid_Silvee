package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record TaxRequest(

        @NotBlank(message = "Tax name is required")
        @Size(max = 50, message = "Tax name must not exceed 50 characters")
        String name,

        @NotBlank(message = "Tax code is required")
        @Pattern(regexp = "^[A-Z0-9]+$", message = "Tax code must contain only uppercase letters and digits")
        @Size(max = 20, message = "Tax code must not exceed 20 characters")
        String code,

        @NotNull(message = "Rate percentage is required")
        @DecimalMin(value = "0.0", message = "Rate percentage cannot be negative")
        @DecimalMax(value = "100.0", message = "Rate percentage cannot exceed 100")
        BigDecimal ratePercentage,

        @NotNull(message = "Status is required")
        Status status
) {
}
