package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.CategoryRequest;
import com.silvee925.erp.dto.response.CategoryResponse;
import com.silvee925.erp.entity.Category;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponse toResponse(Category category);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CategoryRequest request, @MappingTarget Category category);

    default Category toEntity(CategoryRequest request) {
        Category category = new Category();
        updateEntity(request, category);
        return category;
    }
}
