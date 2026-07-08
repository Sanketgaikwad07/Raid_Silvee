package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.CategoryRequest;
import com.silvee925.erp.dto.response.CategoryResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    CategoryResponse get(Long id);

    Page<CategoryResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
