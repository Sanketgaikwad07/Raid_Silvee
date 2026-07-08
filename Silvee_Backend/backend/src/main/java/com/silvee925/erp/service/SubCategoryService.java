package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.SubCategoryRequest;
import com.silvee925.erp.dto.response.SubCategoryResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubCategoryService {

    SubCategoryResponse create(SubCategoryRequest request);

    SubCategoryResponse update(Long id, SubCategoryRequest request);

    SubCategoryResponse get(Long id);

    Page<SubCategoryResponse> search(String query, Long categoryId, Status status, Pageable pageable);

    void delete(Long id);
}
