package com.silvee925.erp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

/** Grants a specific {@link Permission} to a SALES {@link User}. */
@Getter
@Setter
@Entity
@Table(
    name = "user_permissions",
    indexes = @Index(name = "idx_user_permission_user", columnList = "user_id"),
    uniqueConstraints = @UniqueConstraint(name = "uk_user_permission", columnNames = {"user_id", "permission_id"})
)
public class UserPermission extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;
}
