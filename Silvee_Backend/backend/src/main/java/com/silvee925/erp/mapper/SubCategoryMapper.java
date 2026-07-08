package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.SubCategoryRequest;
import com.silvee925.erp.dto.response.SubCategoryResponse;
import com.silvee925.erp.entity.SubCategory;
import org.springframework.stereotype.Component;

/**
 * Manual mapper: the `category` association is resolved and validated in the service
 * layer (it needs a repository lookup), so this only maps the sub-category's own fields.
 */
@Component
public class SubCategoryMapper {

    public void applyFields(SubCategoryRequest request, SubCategory subCategory) {
        subCategory.setName(request.name());
        subCategory.setDescription(request.description());
        subCategory.setStatus(request.status());
    }

    public SubCategoryResponse toResponse(SubCategory subCategory) {
        return new SubCategoryResponse(
                subCategory.getId(),
                subCategory.getName(),
                subCategory.getCategory().getId(),
                subCategory.getCategory().getName(),
                subCategory.getDescription(),
                subCategory.getStatus(),
                subCategory.getCreatedAt(),
                subCategory.getUpdatedAt()
        );
    }
}
