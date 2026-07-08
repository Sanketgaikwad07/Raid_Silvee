package com.silvee925.erp.repository;

import com.silvee925.erp.entity.Permission;
import com.silvee925.erp.entity.enums.PermissionAction;
import com.silvee925.erp.entity.enums.PermissionModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    Optional<Permission> findByModuleAndAction(PermissionModule module, PermissionAction action);
}
