package com.silvee925.erp.entity.enums;

/**
 * The only two roles permitted to authenticate into the system.
 * ADMIN creates and manages SALES (employee) accounts; SALES accounts
 * are scoped down further via {@link PermissionAction} grants.
 */
public enum RoleType {
    ADMIN,
    SALES
}
