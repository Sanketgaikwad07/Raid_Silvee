package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.CompanyRequest;
import com.silvee925.erp.dto.response.CompanyResponse;
import com.silvee925.erp.entity.Company;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.CompanyMapper;
import com.silvee925.erp.repository.CompanyRepository;
import com.silvee925.erp.service.CompanyService;
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
public class CompanyServiceImpl implements CompanyService {

    private static final Logger log = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    @Override
    @Transactional
    public CompanyResponse create(CompanyRequest request) {
        if (companyRepository.existsByCompanyCodeIgnoreCase(request.companyCode())) {
            throw new DuplicateResourceException("Company code '" + request.companyCode() + "' already exists");
        }
        if (StringUtils.hasText(request.gstNo()) && companyRepository.existsByGstNoIgnoreCase(request.gstNo())) {
            throw new DuplicateResourceException("A company with GST No. '" + request.gstNo() + "' already exists");
        }

        boolean isFirstCompany = companyRepository.count() == 0;
        Company company = companyMapper.toEntity(request);
        if (isFirstCompany || company.isDefaultCompany()) {
            clearExistingDefault();
            company.setDefaultCompany(true);
        }
        company = companyRepository.save(company);

        log.info("Company created: {} ({})", company.getCompanyName(), company.getCompanyCode());
        return companyMapper.toResponse(company);
    }

    @Override
    @Transactional
    public CompanyResponse update(Long id, CompanyRequest request) {
        Company company = findOrThrow(id);

        if (companyRepository.existsByCompanyCodeIgnoreCaseAndIdNot(request.companyCode(), id)) {
            throw new DuplicateResourceException("Company code '" + request.companyCode() + "' already exists");
        }
        if (StringUtils.hasText(request.gstNo()) && companyRepository.existsByGstNoIgnoreCaseAndIdNot(request.gstNo(), id)) {
            throw new DuplicateResourceException("A company with GST No. '" + request.gstNo() + "' already exists");
        }

        boolean wasDefault = company.isDefaultCompany();
        companyMapper.updateEntity(request, company);

        if (company.isDefaultCompany() && !wasDefault) {
            clearExistingDefault();
            company.setDefaultCompany(true);
        } else if (!company.isDefaultCompany() && wasDefault && companyRepository.count() > 1) {
            throw new BadRequestException("Cannot unset the default company directly; set another company as default instead");
        } else if (wasDefault) {
            company.setDefaultCompany(true);
        }

        company = companyRepository.save(company);
        log.info("Company updated: {} ({})", company.getCompanyName(), company.getCompanyCode());
        return companyMapper.toResponse(company);
    }

    @Override
    public CompanyResponse get(Long id) {
        return companyMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<CompanyResponse> search(String query, Status status, Pageable pageable) {
        Specification<Company> spec = buildSpecification(query, status);
        return companyRepository.findAll(spec, pageable).map(companyMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Company company = findOrThrow(id);
        if (company.isDefaultCompany() && companyRepository.count() > 1) {
            throw new BadRequestException("Cannot delete the default company; set another company as default first");
        }
        companyRepository.delete(company);
        log.info("Company deleted: {} ({})", company.getCompanyName(), company.getCompanyCode());
    }

    @Override
    @Transactional
    public CompanyResponse setDefault(Long id) {
        Company company = findOrThrow(id);
        clearExistingDefault();
        company.setDefaultCompany(true);
        company = companyRepository.save(company);
        log.info("Company set as default: {} ({})", company.getCompanyName(), company.getCompanyCode());
        return companyMapper.toResponse(company);
    }

    private void clearExistingDefault() {
        companyRepository.findAll(Specification.where(isDefaultSpec())).forEach(c -> {
            c.setDefaultCompany(false);
            companyRepository.save(c);
        });
    }

    private Specification<Company> isDefaultSpec() {
        return (root, cq, cb) -> cb.isTrue(root.get("defaultCompany"));
    }

    private Company findOrThrow(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Company", id));
    }

    private Specification<Company> buildSpecification(String query, Status status) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("companyName")), like),
                        cb.like(cb.lower(root.get("companyCode")), like),
                        cb.like(cb.lower(root.get("gstNo")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
