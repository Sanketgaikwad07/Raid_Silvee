package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.EmployeeRequest;
import com.silvee925.erp.dto.response.EmployeeResponse;
import com.silvee925.erp.entity.Employee;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.EmployeeMapper;
import com.silvee925.erp.repository.EmployeeRepository;
import com.silvee925.erp.repository.UserRepository;
import com.silvee925.erp.service.EmployeeService;
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
public class EmployeeServiceImpl implements EmployeeService {

    private static final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    @Transactional
    public EmployeeResponse create(EmployeeRequest request) {
        if (employeeRepository.existsByEmployeeCodeIgnoreCase(request.employeeCode())) {
            throw new DuplicateResourceException("Employee code '" + request.employeeCode() + "' already exists");
        }
        if (StringUtils.hasText(request.email()) && employeeRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("An employee with email '" + request.email() + "' already exists");
        }

        Employee employee = new Employee();
        employeeMapper.applyFields(request, employee);
        employee = employeeRepository.save(employee);

        log.info("Employee created: {} ({})", employee.getFullName(), employee.getEmployeeCode());
        return employeeMapper.toResponse(employee, false);
    }

    @Override
    @Transactional
    public EmployeeResponse update(Long id, EmployeeRequest request) {
        Employee employee = findOrThrow(id);
        if (employeeRepository.existsByEmployeeCodeIgnoreCaseAndIdNot(request.employeeCode(), id)) {
            throw new DuplicateResourceException("Employee code '" + request.employeeCode() + "' already exists");
        }
        if (StringUtils.hasText(request.email()) && employeeRepository.existsByEmailIgnoreCaseAndIdNot(request.email(), id)) {
            throw new DuplicateResourceException("An employee with email '" + request.email() + "' already exists");
        }

        employeeMapper.applyFields(request, employee);
        employee = employeeRepository.save(employee);

        log.info("Employee updated: {} ({})", employee.getFullName(), employee.getEmployeeCode());
        return employeeMapper.toResponse(employee, userRepository.existsByEmployeeId(id));
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponse get(Long id) {
        Employee employee = findOrThrow(id);
        return employeeMapper.toResponse(employee, userRepository.existsByEmployeeId(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeResponse> search(String query, Status status, Pageable pageable) {
        Specification<Employee> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("fullName")), like),
                        cb.like(cb.lower(root.get("employeeCode")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return employeeRepository.findAll(spec, pageable)
                .map(e -> employeeMapper.toResponse(e, userRepository.existsByEmployeeId(e.getId())));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Employee employee = findOrThrow(id);
        if (userRepository.existsByEmployeeId(id)) {
            throw new BadRequestException(
                    "Cannot delete an employee that has a linked user account; deactivate or delete the account first");
        }
        employeeRepository.delete(employee);
        log.info("Employee deleted: {} ({})", employee.getFullName(), employee.getEmployeeCode());
    }

    private Employee findOrThrow(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Employee", id));
    }
}
