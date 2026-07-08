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
    name = "warehouses",
    indexes = @Index(name = "idx_warehouse_status", columnList = "status")
)
public class Warehouse extends BaseEntity {

    @Column(name = "warehouse_code", nullable = false, unique = true, length = 20)
    private String warehouseCode;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "is_default", nullable = false)
    private boolean defaultWarehouse = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private Status status = Status.ACTIVE;
}
