package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.CurrencyRequest;
import com.silvee925.erp.dto.response.CurrencyResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CurrencyService {

    CurrencyResponse create(CurrencyRequest request);

    CurrencyResponse update(Long id, CurrencyRequest request);

    CurrencyResponse get(Long id);

    Page<CurrencyResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);

    CurrencyResponse setDefault(Long id);
}
