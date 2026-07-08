package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.SalesmanRequest;
import com.silvee925.erp.dto.response.SalesmanResponse;
import com.silvee925.erp.entity.Salesman;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.SalesmanMapper;
import com.silvee925.erp.repository.SalesmanRepository;
import com.silvee925.erp.service.SalesmanService;
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
public class SalesmanServiceImpl implements SalesmanService {

    private static final Logger log = LoggerFactory.getLogger(SalesmanServiceImpl.class);

    private final SalesmanRepository salesmanRepository;
    private final SalesmanMapper salesmanMapper;

    @Override
    @Transactional
    public SalesmanResponse create(SalesmanRequest request) {
        if (salesmanRepository.existsBySalesmanCodeIgnoreCase(request.salesmanCode())) {
            throw new DuplicateResourceException("Salesman code '" + request.salesmanCode() + "' already exists");
        }
        Salesman salesman = salesmanRepository.save(salesmanMapper.toEntity(request));
        log.info("Salesman created: {} ({})", salesman.getName(), salesman.getSalesmanCode());
        return salesmanMapper.toResponse(salesman);
    }

    @Override
    @Transactional
    public SalesmanResponse update(Long id, SalesmanRequest request) {
        Salesman salesman = findOrThrow(id);
        if (salesmanRepository.existsBySalesmanCodeIgnoreCaseAndIdNot(request.salesmanCode(), id)) {
            throw new DuplicateResourceException("Salesman code '" + request.salesmanCode() + "' already exists");
        }
        salesmanMapper.updateEntity(request, salesman);
        salesman = salesmanRepository.save(salesman);
        log.info("Salesman updated: {} ({})", salesman.getName(), salesman.getSalesmanCode());
        return salesmanMapper.toResponse(salesman);
    }

    @Override
    public SalesmanResponse get(Long id) {
        return salesmanMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<SalesmanResponse> search(String query, Status status, Pageable pageable) {
        Specification<Salesman> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("salesmanCode")), like),
                        cb.like(cb.lower(root.get("territory")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return salesmanRepository.findAll(spec, pageable).map(salesmanMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Salesman salesman = findOrThrow(id);
        salesmanRepository.delete(salesman);
        log.info("Salesman deleted: {} ({})", salesman.getName(), salesman.getSalesmanCode());
    }

    private Salesman findOrThrow(Long id) {
        return salesmanRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Salesman", id));
    }
}
