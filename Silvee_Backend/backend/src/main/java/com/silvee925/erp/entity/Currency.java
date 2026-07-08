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
    name = "currencies",
    indexes = @Index(name = "idx_currency_status", columnList = "status")
)
public class Currency extends BaseEntity {

    @Column(name = "code", nullable = false, unique = true, length = 10)
    private String code;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "symbol", nullable = false, length = 5)
    private String symbol;

    @Column(name = "decimal_places", nullable = false)
    private Integer decimalPlaces = 2;

    @Column(name = "is_default", nullable = false)
    private boolean defaultCurrency = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status = Status.ACTIVE;
}
