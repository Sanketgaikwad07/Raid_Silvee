package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.UnitRequest;
import com.silvee925.erp.dto.response.UnitResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UnitService {

    UnitResponse create(UnitRequest request);

    UnitResponse update(Long id, UnitRequest request);

    UnitResponse get(Long id);

    Page<UnitResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
