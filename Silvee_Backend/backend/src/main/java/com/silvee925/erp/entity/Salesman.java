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

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(
    name = "salesmen",
    indexes = @Index(name = "idx_salesman_status", columnList = "status")
)
public class Salesman extends BaseEntity {

    @Column(name = "salesman_code", nullable = false, unique = true, length = 20)
    private String salesmanCode;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "territory", length = 100)
    private String territory;

    @Column(name = "monthly_target", precision = 12, scale = 2)
    private BigDecimal monthlyTarget;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status = Status.ACTIVE;
}
