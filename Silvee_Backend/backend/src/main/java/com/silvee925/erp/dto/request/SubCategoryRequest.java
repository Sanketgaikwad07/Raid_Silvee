package com.silvee925.erp.dto.request;

import com.silvee925.erp.entity.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SubCategoryRequest(

        @NotBlank(message = "Sub category name is required")
        @Size(max = 100, message = "Sub category name must not exceed 100 characters")
        String name,

        @NotNull(message = "Category is required")
        Long categoryId,

        @Size(max = 255, message = "Description must not exceed 255 characters")
        String description,

        @NotNull(message = "Status is required")
        Status status
) {
}
