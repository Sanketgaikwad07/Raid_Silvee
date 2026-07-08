package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.CompanyRequest;
import com.silvee925.erp.dto.response.CompanyResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CompanyService {

    CompanyResponse create(CompanyRequest request);

    CompanyResponse update(Long id, CompanyRequest request);

    CompanyResponse get(Long id);

    Page<CompanyResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);

    CompanyResponse setDefault(Long id);
}
