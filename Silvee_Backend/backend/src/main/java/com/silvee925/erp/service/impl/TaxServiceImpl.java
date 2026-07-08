package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.TaxRequest;
import com.silvee925.erp.dto.response.TaxResponse;
import com.silvee925.erp.entity.Tax;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.TaxMapper;
import com.silvee925.erp.repository.TaxRepository;
import com.silvee925.erp.service.TaxService;
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
public class TaxServiceImpl implements TaxService {

    private static final Logger log = LoggerFactory.getLogger(TaxServiceImpl.class);

    private final TaxRepository taxRepository;
    private final TaxMapper taxMapper;

    @Override
    @Transactional
    public TaxResponse create(TaxRequest request) {
        if (taxRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Tax code '" + request.code() + "' already exists");
        }
        Tax tax = taxRepository.save(taxMapper.toEntity(request));
        log.info("Tax created: {} ({})", tax.getName(), tax.getCode());
        return taxMapper.toResponse(tax);
    }

    @Override
    @Transactional
    public TaxResponse update(Long id, TaxRequest request) {
        Tax tax = findOrThrow(id);
        if (taxRepository.existsByCodeIgnoreCaseAndIdNot(request.code(), id)) {
            throw new DuplicateResourceException("Tax code '" + request.code() + "' already exists");
        }
        taxMapper.updateEntity(request, tax);
        tax = taxRepository.save(tax);
        log.info("Tax updated: {} ({})", tax.getName(), tax.getCode());
        return taxMapper.toResponse(tax);
    }

    @Override
    public TaxResponse get(Long id) {
        return taxMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<TaxResponse> search(String query, Status status, Pageable pageable) {
        Specification<Tax> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("code")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return taxRepository.findAll(spec, pageable).map(taxMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Tax tax = findOrThrow(id);
        taxRepository.delete(tax);
        log.info("Tax deleted: {} ({})", tax.getName(), tax.getCode());
    }

    private Tax findOrThrow(Long id) {
        return taxRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Tax", id));
    }
}
