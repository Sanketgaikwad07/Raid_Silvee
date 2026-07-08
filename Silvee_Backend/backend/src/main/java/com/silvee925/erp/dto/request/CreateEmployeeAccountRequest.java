package com.silvee925.erp.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

/** ADMIN-only: creates an Employee Master record and a linked SALES login account in one step. */
public record CreateEmployeeAccountRequest(

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

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be a valid email address")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 100, message = "Password must be at least 8 characters")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()_+=-]).*$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        String password,

        @NotEmpty(message = "At least one permission must be granted")
        List<@Valid PermissionGrantRequest> permissions
) {
}
