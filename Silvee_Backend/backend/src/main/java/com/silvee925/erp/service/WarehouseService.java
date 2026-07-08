package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.WarehouseRequest;
import com.silvee925.erp.dto.response.WarehouseResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WarehouseService {

    WarehouseResponse create(WarehouseRequest request);

    WarehouseResponse update(Long id, WarehouseRequest request);

    WarehouseResponse get(Long id);

    Page<WarehouseResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);

    WarehouseResponse setDefault(Long id);
}
