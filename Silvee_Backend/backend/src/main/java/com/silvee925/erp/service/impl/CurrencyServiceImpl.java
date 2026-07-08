package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.CurrencyRequest;
import com.silvee925.erp.dto.response.CurrencyResponse;
import com.silvee925.erp.entity.Currency;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.CurrencyMapper;
import com.silvee925.erp.repository.CurrencyRepository;
import com.silvee925.erp.service.CurrencyService;
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
public class CurrencyServiceImpl implements CurrencyService {

    private static final Logger log = LoggerFactory.getLogger(CurrencyServiceImpl.class);

    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;

    @Override
    @Transactional
    public CurrencyResponse create(CurrencyRequest request) {
        if (currencyRepository.existsByCodeIgnoreCase(request.code())) {
            throw new DuplicateResourceException("Currency code '" + request.code() + "' already exists");
        }
        boolean isFirst = currencyRepository.count() == 0;
        Currency currency = currencyMapper.toEntity(request);
        if (isFirst || currency.isDefaultCurrency()) {
            clearExistingDefault();
            currency.setDefaultCurrency(true);
        }
        currency = currencyRepository.save(currency);
        log.info("Currency created: {} ({})", currency.getName(), currency.getCode());
        return currencyMapper.toResponse(currency);
    }

    @Override
    @Transactional
    public CurrencyResponse update(Long id, CurrencyRequest request) {
        Currency currency = findOrThrow(id);
        if (currencyRepository.existsByCodeIgnoreCaseAndIdNot(request.code(), id)) {
            throw new DuplicateResourceException("Currency code '" + request.code() + "' already exists");
        }

        boolean wasDefault = currency.isDefaultCurrency();
        currencyMapper.updateEntity(request, currency);

        if (currency.isDefaultCurrency() && !wasDefault) {
            clearExistingDefault();
            currency.setDefaultCurrency(true);
        } else if (!currency.isDefaultCurrency() && wasDefault && currencyRepository.count() > 1) {
            throw new BadRequestException("Cannot unset the default currency directly; set another currency as default instead");
        } else if (wasDefault) {
            currency.setDefaultCurrency(true);
        }

        currency = currencyRepository.save(currency);
        log.info("Currency updated: {} ({})", currency.getName(), currency.getCode());
        return currencyMapper.toResponse(currency);
    }

    @Override
    public CurrencyResponse get(Long id) {
        return currencyMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<CurrencyResponse> search(String query, Status status, Pageable pageable) {
        Specification<Currency> spec = (root, cq, cb) -> {
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
        return currencyRepository.findAll(spec, pageable).map(currencyMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Currency currency = findOrThrow(id);
        if (currency.isDefaultCurrency() && currencyRepository.count() > 1) {
            throw new BadRequestException("Cannot delete the default currency; set another currency as default first");
        }
        currencyRepository.delete(currency);
        log.info("Currency deleted: {} ({})", currency.getName(), currency.getCode());
    }

    @Override
    @Transactional
    public CurrencyResponse setDefault(Long id) {
        Currency currency = findOrThrow(id);
        clearExistingDefault();
        currency.setDefaultCurrency(true);
        currency = currencyRepository.save(currency);
        log.info("Currency set as default: {} ({})", currency.getName(), currency.getCode());
        return currencyMapper.toResponse(currency);
    }

    private void clearExistingDefault() {
        currencyRepository.findAll(isDefaultSpec()).forEach(c -> {
            c.setDefaultCurrency(false);
            currencyRepository.save(c);
        });
    }

    private Specification<Currency> isDefaultSpec() {
        return (root, cq, cb) -> cb.isTrue(root.get("defaultCurrency"));
    }

    private Currency findOrThrow(Long id) {
        return currencyRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Currency", id));
    }
}
