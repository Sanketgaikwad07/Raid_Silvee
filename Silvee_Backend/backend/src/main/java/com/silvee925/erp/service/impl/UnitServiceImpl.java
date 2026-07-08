package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.UnitRequest;
import com.silvee925.erp.dto.response.UnitResponse;
import com.silvee925.erp.entity.MeasurementUnit;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.UnitMapper;
import com.silvee925.erp.repository.MeasurementUnitRepository;
import com.silvee925.erp.service.UnitService;
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
public class UnitServiceImpl implements UnitService {

    private static final Logger log = LoggerFactory.getLogger(UnitServiceImpl.class);

    private final MeasurementUnitRepository unitRepository;
    private final UnitMapper unitMapper;

    @Override
    @Transactional
    public UnitResponse create(UnitRequest request) {
        if (unitRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Unit '" + request.name() + "' already exists");
        }
        if (unitRepository.existsByAbbreviationIgnoreCase(request.abbreviation())) {
            throw new DuplicateResourceException("Unit abbreviation '" + request.abbreviation() + "' already exists");
        }
        MeasurementUnit unit = unitRepository.save(unitMapper.toEntity(request));
        log.info("Unit created: {} ({})", unit.getName(), unit.getAbbreviation());
        return unitMapper.toResponse(unit);
    }

    @Override
    @Transactional
    public UnitResponse update(Long id, UnitRequest request) {
        MeasurementUnit unit = findOrThrow(id);
        if (unitRepository.existsByNameIgnoreCaseAndIdNot(request.name(), id)) {
            throw new DuplicateResourceException("Unit '" + request.name() + "' already exists");
        }
        if (unitRepository.existsByAbbreviationIgnoreCaseAndIdNot(request.abbreviation(), id)) {
            throw new DuplicateResourceException("Unit abbreviation '" + request.abbreviation() + "' already exists");
        }
        unitMapper.updateEntity(request, unit);
        unit = unitRepository.save(unit);
        log.info("Unit updated: {} ({})", unit.getName(), unit.getAbbreviation());
        return unitMapper.toResponse(unit);
    }

    @Override
    public UnitResponse get(Long id) {
        return unitMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<UnitResponse> search(String query, Status status, Pageable pageable) {
        Specification<MeasurementUnit> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("abbreviation")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return unitRepository.findAll(spec, pageable).map(unitMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MeasurementUnit unit = findOrThrow(id);
        unitRepository.delete(unit);
        log.info("Unit deleted: {} ({})", unit.getName(), unit.getAbbreviation());
    }

    private MeasurementUnit findOrThrow(Long id) {
        return unitRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Unit", id));
    }
}
