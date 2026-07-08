package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.EmployeeRequest;
import com.silvee925.erp.dto.response.EmployeeResponse;
import com.silvee925.erp.entity.Employee;
import org.springframework.stereotype.Component;

/** Manual mapper: `hasUserAccount` is derived via a repository check, not an entity field. */
@Component
public class EmployeeMapper {

    public void applyFields(EmployeeRequest request, Employee employee) {
        employee.setEmployeeCode(request.employeeCode());
        employee.setFullName(request.fullName());
        employee.setDesignation(request.designation());
        employee.setPhone(request.phone());
        employee.setEmail(request.email());
        employee.setStatus(request.status());
    }

    public EmployeeResponse toResponse(Employee employee, boolean hasUserAccount) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFullName(),
                employee.getDesignation(),
                employee.getPhone(),
                employee.getEmail(),
                hasUserAccount,
                employee.getStatus(),
                employee.getCreatedAt(),
                employee.getUpdatedAt()
        );
    }
}
