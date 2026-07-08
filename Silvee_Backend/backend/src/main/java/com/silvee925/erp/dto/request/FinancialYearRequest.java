package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record FinancialYearRequest(

        @NotBlank(message = "Financial year name is required")
        @Size(max = 20, message = "Financial year name must not exceed 20 characters")
        String name,

        @NotNull(message = "Start date is required")
        LocalDate startDate,

        @NotNull(message = "End date is required")
        LocalDate endDate,

        boolean activeYear,

        @NotNull(message = "Status is required")
        Status status
) {
}
