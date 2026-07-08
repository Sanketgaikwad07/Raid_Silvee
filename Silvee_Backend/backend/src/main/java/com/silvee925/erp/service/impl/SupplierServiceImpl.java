package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.SupplierRequest;
import com.silvee925.erp.dto.response.SupplierResponse;
import com.silvee925.erp.entity.Supplier;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.SupplierMapper;
import com.silvee925.erp.repository.SupplierRepository;
import com.silvee925.erp.service.SupplierService;
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
public class SupplierServiceImpl implements SupplierService {

    private static final Logger log = LoggerFactory.getLogger(SupplierServiceImpl.class);

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    @Override
    @Transactional
    public SupplierResponse create(SupplierRequest request) {
        if (supplierRepository.existsBySupplierCodeIgnoreCase(request.supplierCode())) {
            throw new DuplicateResourceException("Supplier code '" + request.supplierCode() + "' already exists");
        }
        Supplier supplier = supplierRepository.save(supplierMapper.toEntity(request));
        log.info("Supplier created: {} ({})", supplier.getName(), supplier.getSupplierCode());
        return supplierMapper.toResponse(supplier);
    }

    @Override
    @Transactional
    public SupplierResponse update(Long id, SupplierRequest request) {
        Supplier supplier = findOrThrow(id);
        if (supplierRepository.existsBySupplierCodeIgnoreCaseAndIdNot(request.supplierCode(), id)) {
            throw new DuplicateResourceException("Supplier code '" + request.supplierCode() + "' already exists");
        }
        supplierMapper.updateEntity(request, supplier);
        supplier = supplierRepository.save(supplier);
        log.info("Supplier updated: {} ({})", supplier.getName(), supplier.getSupplierCode());
        return supplierMapper.toResponse(supplier);
    }

    @Override
    public SupplierResponse get(Long id) {
        return supplierMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<SupplierResponse> search(String query, Status status, Pageable pageable) {
        Specification<Supplier> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("supplierCode")), like),
                        cb.like(cb.lower(root.get("phone")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return supplierRepository.findAll(spec, pageable).map(supplierMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Supplier supplier = findOrThrow(id);
        supplierRepository.delete(supplier);
        log.info("Supplier deleted: {} ({})", supplier.getName(), supplier.getSupplierCode());
    }

    private Supplier findOrThrow(Long id) {
        return supplierRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Supplier", id));
    }
}
