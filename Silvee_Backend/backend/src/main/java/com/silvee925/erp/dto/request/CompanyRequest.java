package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CompanyRequest(

        @NotBlank(message = "Company code is required")
        @Size(max = 20, message = "Company code must not exceed 20 characters")
        @Pattern(regexp = "^[A-Z0-9-]+$", message = "Company code must contain only uppercase letters, digits, and hyphens")
        String companyCode,

        @NotBlank(message = "Company name is required")
        @Size(max = 150, message = "Company name must not exceed 150 characters")
        String companyName,

        @Size(max = 150, message = "Legal name must not exceed 150 characters")
        String legalName,

        @Size(max = 30, message = "Company type must not exceed 30 characters")
        String companyType,

        // These fields are optional, and @Pattern only special-cases null (not ""), so each
        // regex is alternated with an empty-string match for callers that send "" rather than omitting the field.
        @Pattern(
                regexp = "^$|^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
                message = "GST No. must be a valid 15-character GSTIN"
        )
        String gstNo,

        @Pattern(regexp = "^$|^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "PAN No. must be a valid 10-character PAN")
        String panNo,

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^[+]?[0-9 ()-]{7,20}$", message = "Phone must be a valid phone number")
        String phone,

        @Pattern(regexp = "^$|^[+]?[0-9 ()-]{7,20}$", message = "Alternate phone must be a valid phone number")
        String alternatePhone,

        @Email(message = "Email must be a valid email address")
        @Size(max = 100, message = "Email must not exceed 100 characters")
        String email,

        @Size(max = 150, message = "Website must not exceed 150 characters")
        String website,

        @Size(max = 200, message = "Address line 1 must not exceed 200 characters")
        String addressLine1,

        @Size(max = 200, message = "Address line 2 must not exceed 200 characters")
        String addressLine2,

        @Size(max = 50, message = "City must not exceed 50 characters")
        String city,

        @NotBlank(message = "State is required")
        @Size(max = 50, message = "State must not exceed 50 characters")
        String state,

        @Pattern(regexp = "^$|^[0-9]{1,2}$", message = "State code must be a 1-2 digit GST state code")
        String stateCode,

        @Pattern(regexp = "^$|^[0-9]{6}$", message = "Pincode must be a valid 6-digit Indian PIN code")
        String pincode,

        @NotBlank(message = "Country is required")
        @Size(max = 50, message = "Country must not exceed 50 characters")
        String country,

        @NotBlank(message = "Currency is required")
        @Size(max = 10, message = "Currency must not exceed 10 characters")
        String currency,

        @Size(max = 255, message = "Logo URL must not exceed 255 characters")
        String logoUrl,

        boolean defaultCompany,

        @NotNull(message = "Status is required")
        Status status
) {
}
