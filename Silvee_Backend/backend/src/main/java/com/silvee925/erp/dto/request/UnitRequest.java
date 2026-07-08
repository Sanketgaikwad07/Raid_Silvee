package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UnitRequest(

        @NotBlank(message = "Unit name is required")
        @Size(max = 50, message = "Unit name must not exceed 50 characters")
        String name,

        @NotBlank(message = "Abbreviation is required")
        @Size(max = 10, message = "Abbreviation must not exceed 10 characters")
        String abbreviation,

        @NotNull(message = "Status is required")
        Status status
) {
}
