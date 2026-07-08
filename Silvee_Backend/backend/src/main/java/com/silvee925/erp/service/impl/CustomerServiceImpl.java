package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.CustomerRequest;
import com.silvee925.erp.dto.response.CustomerResponse;
import com.silvee925.erp.entity.Customer;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.CustomerMapper;
import com.silvee925.erp.repository.CustomerRepository;
import com.silvee925.erp.service.CustomerService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private static final Logger log = LoggerFactory.getLogger(CustomerServiceImpl.class);

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    @Transactional
    public CustomerResponse create(CustomerRequest request) {
        if (customerRepository.existsByCustomerCodeIgnoreCase(request.customerCode())) {
            throw new DuplicateResourceException("Customer code '" + request.customerCode() + "' already exists");
        }
        Customer customer = customerRepository.save(customerMapper.toEntity(request));
        log.info("Customer created: {} ({})", customer.getName(), customer.getCustomerCode());
        return customerMapper.toResponse(customer);
    }

    @Override
    @Transactional
    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer customer = findOrThrow(id);
        if (customerRepository.existsByCustomerCodeIgnoreCaseAndIdNot(request.customerCode(), id)) {
            throw new DuplicateResourceException("Customer code '" + request.customerCode() + "' already exists");
        }
        customerMapper.updateEntity(request, customer);
        customer = customerRepository.save(customer);
        log.info("Customer updated: {} ({})", customer.getName(), customer.getCustomerCode());
        return customerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse get(Long id) {
        return customerMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<CustomerResponse> search(String query, Status status, Pageable pageable) {
        Specification<Customer> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("customerCode")), like),
                        cb.like(cb.lower(root.get("phone")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return customerRepository.findAll(spec, pageable).map(customerMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Customer customer = findOrThrow(id);
        customerRepository.delete(customer);
        log.info("Customer deleted: {} ({})", customer.getName(), customer.getCustomerCode());
    }

    private Customer findOrThrow(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Customer", id));
    }
}
