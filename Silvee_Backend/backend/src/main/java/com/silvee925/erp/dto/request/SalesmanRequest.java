package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record SalesmanRequest(

        @NotBlank(message = "Salesman code is required")
        @Size(max = 20, message = "Salesman code must not exceed 20 characters")
        String salesmanCode,

        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must not exceed 100 characters")
        String name,

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^[+]?[0-9 ()-]{7,20}$", message = "Phone must be a valid phone number")
        String phone,

        @Email(message = "Email must be a valid email address")
        @Size(max = 100, message = "Email must not exceed 100 characters")
        String email,

        @Size(max = 100, message = "Territory must not exceed 100 characters")
        String territory,

        @DecimalMin(value = "0.0", message = "Monthly target cannot be negative")
        BigDecimal monthlyTarget,

        @NotNull(message = "Status is required")
        Status status
) {
}
