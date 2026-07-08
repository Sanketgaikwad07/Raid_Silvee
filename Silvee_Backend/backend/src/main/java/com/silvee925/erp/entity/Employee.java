package com.silvee925.erp.entity;

import com.silvee925.erp.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "employees",
    indexes = {
        @Index(name = "idx_employee_status", columnList = "status"),
        @Index(name = "idx_employee_phone", columnList = "phone")
    }
)
public class Employee extends BaseEntity {

    @Column(name = "employee_code", nullable = false, unique = true, length = 20)
    private String employeeCode;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    /** Free-text business designation (e.g. "Sales Manager") - distinct from the system RoleType. */
    @Column(name = "designation", length = 50)
    private String designation;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "email", unique = true, length = 100)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status = Status.ACTIVE;
}
