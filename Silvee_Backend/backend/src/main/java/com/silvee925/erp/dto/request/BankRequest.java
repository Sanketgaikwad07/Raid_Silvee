package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record BankRequest(

        @NotBlank(message = "Bank name is required")
        @Size(max = 100, message = "Bank name must not exceed 100 characters")
        String bankName,

        @NotBlank(message = "Branch is required")
        @Size(max = 100, message = "Branch must not exceed 100 characters")
        String branch,

        @NotBlank(message = "Account holder name is required")
        @Size(max = 100, message = "Account holder name must not exceed 100 characters")
        String accountHolderName,

        @NotBlank(message = "Account number is required")
        @Pattern(regexp = "^[0-9A-Za-z]{6,30}$", message = "Account number must be 6-30 alphanumeric characters")
        String accountNo,

        @NotBlank(message = "IFSC code is required")
        @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "IFSC code must be a valid 11-character IFSC (e.g. SBIN0001234)")
        String ifscCode,

        @NotNull(message = "Status is required")
        Status status
) {
}
