package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record CustomerRequest(

        @NotBlank(message = "Customer code is required")
        @Size(max = 20, message = "Customer code must not exceed 20 characters")
        String customerCode,

        @NotBlank(message = "Customer name is required")
        @Size(max = 150, message = "Customer name must not exceed 150 characters")
        String name,

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^[+]?[0-9 ()-]{7,20}$", message = "Phone must be a valid phone number")
        String phone,

        @Email(message = "Email must be a valid email address")
        @Size(max = 100, message = "Email must not exceed 100 characters")
        String email,

        // Optional field: @Pattern only special-cases null (not ""), so the alternation lets
        // "" through for callers that send an empty string rather than omitting it.
        @Pattern(
                regexp = "^$|^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
                message = "GST No. must be a valid 15-character GSTIN"
        )
        String gstNo,

        @Size(max = 200, message = "Address must not exceed 200 characters")
        String addressLine1,

        @Size(max = 50, message = "City must not exceed 50 characters")
        String city,

        @Size(max = 50, message = "State must not exceed 50 characters")
        String state,

        @Pattern(regexp = "^$|^[0-9]{6}$", message = "Pincode must be a valid 6-digit Indian PIN code")
        String pincode,

        @DecimalMin(value = "0.0", message = "Credit limit cannot be negative")
        BigDecimal creditLimit,

        @NotNull(message = "Opening balance is required")
        BigDecimal openingBalance,

        @NotNull(message = "Status is required")
        Status status
) {
}
