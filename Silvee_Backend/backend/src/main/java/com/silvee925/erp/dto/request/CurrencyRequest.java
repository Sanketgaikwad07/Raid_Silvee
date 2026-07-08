package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CurrencyRequest(

        @NotBlank(message = "Currency code is required")
        @Pattern(regexp = "^[A-Z]{3}$", message = "Currency code must be a valid 3-letter ISO 4217 code (e.g. INR)")
        String code,

        @NotBlank(message = "Currency name is required")
        @Size(max = 50, message = "Currency name must not exceed 50 characters")
        String name,

        @NotBlank(message = "Symbol is required")
        @Size(max = 5, message = "Symbol must not exceed 5 characters")
        String symbol,

        @NotNull(message = "Decimal places is required")
        @Min(value = 0, message = "Decimal places cannot be negative")
        @Max(value = 4, message = "Decimal places cannot exceed 4")
        Integer decimalPlaces,

        boolean defaultCurrency,

        @NotNull(message = "Status is required")
        Status status
) {
}
