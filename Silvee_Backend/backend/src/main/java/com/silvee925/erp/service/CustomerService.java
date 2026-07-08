package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.CustomerRequest;
import com.silvee925.erp.dto.response.CustomerResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerService {

    CustomerResponse create(CustomerRequest request);

    CustomerResponse update(Long id, CustomerRequest request);

    CustomerResponse get(Long id);

    Page<CustomerResponse> search(String query, Status status, Pageable pageable);

    void delete(Long id);
}
