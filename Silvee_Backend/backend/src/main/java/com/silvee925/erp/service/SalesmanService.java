package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.SalesmanRequest;
import com.silvee925.erp.dto.response.SalesmanResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SalesmanService {

    SalesmanResponse create(SalesmanRequest request);

    SalesmanResponse update(Long id, SalesmanRequest request);

    SalesmanResponse get(Long id);

    Page<SalesmanResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
