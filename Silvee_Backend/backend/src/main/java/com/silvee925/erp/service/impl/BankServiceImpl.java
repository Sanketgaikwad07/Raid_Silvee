package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.BankRequest;
import com.silvee925.erp.dto.response.BankResponse;
import com.silvee925.erp.entity.Bank;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.BankMapper;
import com.silvee925.erp.repository.BankRepository;
import com.silvee925.erp.service.BankService;
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
public class BankServiceImpl implements BankService {

    private static final Logger log = LoggerFactory.getLogger(BankServiceImpl.class);

    private final BankRepository bankRepository;
    private final BankMapper bankMapper;

    @Override
    @Transactional
    public BankResponse create(BankRequest request) {
        if (bankRepository.existsByAccountNoIgnoreCase(request.accountNo())) {
            throw new DuplicateResourceException("A bank account with number '" + request.accountNo() + "' already exists");
        }
        Bank bank = bankRepository.save(bankMapper.toEntity(request));
        log.info("Bank created: {} - {}", bank.getBankName(), bank.getBranch());
        return bankMapper.toResponse(bank);
    }

    @Override
    @Transactional
    public BankResponse update(Long id, BankRequest request) {
        Bank bank = findOrThrow(id);
        if (bankRepository.existsByAccountNoIgnoreCaseAndIdNot(request.accountNo(), id)) {
            throw new DuplicateResourceException("A bank account with number '" + request.accountNo() + "' already exists");
        }
        bankMapper.updateEntity(request, bank);
        bank = bankRepository.save(bank);
        log.info("Bank updated: {} - {}", bank.getBankName(), bank.getBranch());
        return bankMapper.toResponse(bank);
    }

    @Override
    public BankResponse get(Long id) {
        return bankMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<BankResponse> search(String query, Status status, Pageable pageable) {
        Specification<Bank> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("bankName")), like),
                        cb.like(cb.lower(root.get("branch")), like),
                        cb.like(cb.lower(root.get("accountNo")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return bankRepository.findAll(spec, pageable).map(bankMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Bank bank = findOrThrow(id);
        bankRepository.delete(bank);
        log.info("Bank deleted: {} - {}", bank.getBankName(), bank.getBranch());
    }

    private Bank findOrThrow(Long id) {
        return bankRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Bank", id));
    }
}
