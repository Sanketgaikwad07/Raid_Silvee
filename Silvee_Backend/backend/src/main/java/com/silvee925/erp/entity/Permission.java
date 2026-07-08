package com.silvee925.erp.entity;

import com.silvee925.erp.entity.enums.PermissionAction;
import com.silvee925.erp.entity.enums.PermissionModule;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

/** Catalog of assignable (module, action) permission pairs. Seeded at startup. */
@Getter
@Setter
@Entity
@Table(
    name = "permissions",
    uniqueConstraints = @UniqueConstraint(name = "uk_permission_module_action", columnNames = {"module", "action"})
)
public class Permission extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "module", nullable = false, length = 30)
    private PermissionModule module;

    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false, length = 20)
    private PermissionAction action;
}
