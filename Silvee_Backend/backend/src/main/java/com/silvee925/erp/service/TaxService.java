package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.TaxRequest;
import com.silvee925.erp.dto.response.TaxResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaxService {

    TaxResponse create(TaxRequest request);

    TaxResponse update(Long id, TaxRequest request);

    TaxResponse get(Long id);

    Page<TaxResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
