package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.FinancialYearRequest;
import com.silvee925.erp.dto.response.FinancialYearResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FinancialYearService {

    FinancialYearResponse create(FinancialYearRequest request);

    FinancialYearResponse update(Long id, FinancialYearRequest request);

    FinancialYearResponse get(Long id);

    Page<FinancialYearResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);

    FinancialYearResponse setActive(Long id);
}
