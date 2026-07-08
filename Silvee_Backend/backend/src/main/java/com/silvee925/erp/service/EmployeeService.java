package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.EmployeeRequest;
import com.silvee925.erp.dto.response.EmployeeResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    EmployeeResponse create(EmployeeRequest request);

    EmployeeResponse update(Long id, EmployeeRequest request);

    EmployeeResponse get(Long id);

    Page<EmployeeResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
