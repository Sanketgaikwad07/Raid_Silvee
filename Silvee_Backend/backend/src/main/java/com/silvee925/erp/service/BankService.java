package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.BankRequest;
import com.silvee925.erp.dto.response.BankResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BankService {

    BankResponse create(BankRequest request);

    BankResponse update(Long id, BankRequest request);

    BankResponse get(Long id);

    Page<BankResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
