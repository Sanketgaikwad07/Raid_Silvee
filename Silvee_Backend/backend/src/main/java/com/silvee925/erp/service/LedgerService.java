package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.LedgerRequest;
import com.silvee925.erp.dto.response.LedgerResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LedgerService {

    LedgerResponse create(LedgerRequest request);

    LedgerResponse update(Long id, LedgerRequest request);

    LedgerResponse get(Long id);

    Page<LedgerResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
