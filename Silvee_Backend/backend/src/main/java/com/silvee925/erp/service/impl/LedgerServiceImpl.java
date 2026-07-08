package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.LedgerRequest;
import com.silvee925.erp.dto.response.LedgerResponse;
import com.silvee925.erp.entity.Ledger;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.LedgerMapper;
import com.silvee925.erp.repository.LedgerRepository;
import com.silvee925.erp.service.LedgerService;
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
public class LedgerServiceImpl implements LedgerService {

    private static final Logger log = LoggerFactory.getLogger(LedgerServiceImpl.class);

    private final LedgerRepository ledgerRepository;
    private final LedgerMapper ledgerMapper;

    @Override
    @Transactional
    public LedgerResponse create(LedgerRequest request) {
        validateUnique(request, null);
        Ledger ledger = ledgerRepository.save(ledgerMapper.toEntity(request));
        log.info("Ledger created: {} ({})", ledger.getName(), ledger.getLedgerCode());
        return ledgerMapper.toResponse(ledger);
    }

    @Override
    @Transactional
    public LedgerResponse update(Long id, LedgerRequest request) {
        Ledger ledger = findOrThrow(id);
        validateUnique(request, id);
        ledgerMapper.updateEntity(request, ledger);
        ledger = ledgerRepository.save(ledger);
        log.info("Ledger updated: {} ({})", ledger.getName(), ledger.getLedgerCode());
        return ledgerMapper.toResponse(ledger);
    }

    @Override
    public LedgerResponse get(Long id) {
        return ledgerMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<LedgerResponse> search(String query, Status status, Pageable pageable) {
        Specification<Ledger> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("ledgerCode")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return ledgerRepository.findAll(spec, pageable).map(ledgerMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Ledger ledger = findOrThrow(id);
        ledgerRepository.delete(ledger);
        log.info("Ledger deleted: {} ({})", ledger.getName(), ledger.getLedgerCode());
    }

    private void validateUnique(LedgerRequest request, Long excludeId) {
        boolean codeExists = excludeId == null
                ? ledgerRepository.existsByLedgerCodeIgnoreCase(request.ledgerCode())
                : ledgerRepository.existsByLedgerCodeIgnoreCaseAndIdNot(request.ledgerCode(), excludeId);
        if (codeExists) {
            throw new DuplicateResourceException("Ledger code '" + request.ledgerCode() + "' already exists");
        }
        boolean nameExists = excludeId == null
                ? ledgerRepository.existsByNameIgnoreCase(request.name())
                : ledgerRepository.existsByNameIgnoreCaseAndIdNot(request.name(), excludeId);
        if (nameExists) {
            throw new DuplicateResourceException("Ledger '" + request.name() + "' already exists");
        }
    }

    private Ledger findOrThrow(Long id) {
        return ledgerRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Ledger", id));
    }
}
