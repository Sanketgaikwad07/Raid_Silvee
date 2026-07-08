package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.FinancialYearRequest;
import com.silvee925.erp.dto.response.FinancialYearResponse;
import com.silvee925.erp.entity.FinancialYear;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.FinancialYearMapper;
import com.silvee925.erp.repository.FinancialYearRepository;
import com.silvee925.erp.service.FinancialYearService;
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
public class FinancialYearServiceImpl implements FinancialYearService {

    private static final Logger log = LoggerFactory.getLogger(FinancialYearServiceImpl.class);

    private final FinancialYearRepository financialYearRepository;
    private final FinancialYearMapper financialYearMapper;

    @Override
    @Transactional
    public FinancialYearResponse create(FinancialYearRequest request) {
        validateDateRange(request);
        if (financialYearRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Financial year '" + request.name() + "' already exists");
        }
        assertNoOverlap(request, null);

        boolean isFirst = financialYearRepository.count() == 0;
        FinancialYear financialYear = financialYearMapper.toEntity(request);
        if (isFirst || financialYear.isActiveYear()) {
            clearExistingActive();
            financialYear.setActiveYear(true);
        }
        financialYear = financialYearRepository.save(financialYear);
        log.info("Financial year created: {}", financialYear.getName());
        return financialYearMapper.toResponse(financialYear);
    }

    @Override
    @Transactional
    public FinancialYearResponse update(Long id, FinancialYearRequest request) {
        validateDateRange(request);
        FinancialYear financialYear = findOrThrow(id);
        if (financialYearRepository.existsByNameIgnoreCaseAndIdNot(request.name(), id)) {
            throw new DuplicateResourceException("Financial year '" + request.name() + "' already exists");
        }
        assertNoOverlap(request, id);

        boolean wasActive = financialYear.isActiveYear();
        financialYearMapper.updateEntity(request, financialYear);

        if (financialYear.isActiveYear() && !wasActive) {
            clearExistingActive();
            financialYear.setActiveYear(true);
        } else if (!financialYear.isActiveYear() && wasActive && financialYearRepository.count() > 1) {
            throw new BadRequestException("Cannot unset the active financial year directly; activate another year instead");
        } else if (wasActive) {
            financialYear.setActiveYear(true);
        }

        financialYear = financialYearRepository.save(financialYear);
        log.info("Financial year updated: {}", financialYear.getName());
        return financialYearMapper.toResponse(financialYear);
    }

    @Override
    public FinancialYearResponse get(Long id) {
        return financialYearMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<FinancialYearResponse> search(String query, Status status, Pageable pageable) {
        Specification<FinancialYear> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + query.toLowerCase() + "%"));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return financialYearRepository.findAll(spec, pageable).map(financialYearMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        FinancialYear financialYear = findOrThrow(id);
        if (financialYear.isActiveYear() && financialYearRepository.count() > 1) {
            throw new BadRequestException("Cannot delete the active financial year; activate another year first");
        }
        financialYearRepository.delete(financialYear);
        log.info("Financial year deleted: {}", financialYear.getName());
    }

    @Override
    @Transactional
    public FinancialYearResponse setActive(Long id) {
        FinancialYear financialYear = findOrThrow(id);
        clearExistingActive();
        financialYear.setActiveYear(true);
        financialYear = financialYearRepository.save(financialYear);
        log.info("Financial year activated: {}", financialYear.getName());
        return financialYearMapper.toResponse(financialYear);
    }

    private void validateDateRange(FinancialYearRequest request) {
        if (!request.endDate().isAfter(request.startDate())) {
            throw new BadRequestException("End date must be after start date");
        }
    }

    private void assertNoOverlap(FinancialYearRequest request, Long excludeId) {
        boolean overlaps = financialYearRepository.findAll().stream()
                .filter(fy -> excludeId == null || !fy.getId().equals(excludeId))
                .anyMatch(fy -> !request.startDate().isAfter(fy.getEndDate()) && !fy.getStartDate().isAfter(request.endDate()));
        if (overlaps) {
            throw new BadRequestException("This date range overlaps with an existing financial year");
        }
    }

    private void clearExistingActive() {
        financialYearRepository.findAll(isActiveSpec()).forEach(fy -> {
            fy.setActiveYear(false);
            financialYearRepository.save(fy);
        });
    }

    private Specification<FinancialYear> isActiveSpec() {
        return (root, cq, cb) -> cb.isTrue(root.get("activeYear"));
    }

    private FinancialYear findOrThrow(Long id) {
        return financialYearRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Financial Year", id));
    }
}
