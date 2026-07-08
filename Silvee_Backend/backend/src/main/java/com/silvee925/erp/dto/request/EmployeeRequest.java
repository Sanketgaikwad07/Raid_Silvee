package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EmployeeRequest(

        @NotBlank(message = "Employee code is required")
        @Size(max = 20, message = "Employee code must not exceed 20 characters")
        String employeeCode,

        @NotBlank(message = "Full name is required")
        @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
        String fullName,

        @Size(max = 50, message = "Designation must not exceed 50 characters")
        String designation,

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^[+]?[0-9 ()-]{7,20}$", message = "Phone must be a valid phone number")
        String phone,

        @Email(message = "Email must be a valid email address")
        @Size(max = 100, message = "Email must not exceed 100 characters")
        String email,

        @NotNull(message = "Status is required")
        Status status
) {
}
