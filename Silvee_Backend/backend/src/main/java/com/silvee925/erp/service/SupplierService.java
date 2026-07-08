package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.SupplierRequest;
import com.silvee925.erp.dto.response.SupplierResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SupplierService {

    SupplierResponse create(SupplierRequest request);

    SupplierResponse update(Long id, SupplierRequest request);

    SupplierResponse get(Long id);

    Page<SupplierResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
