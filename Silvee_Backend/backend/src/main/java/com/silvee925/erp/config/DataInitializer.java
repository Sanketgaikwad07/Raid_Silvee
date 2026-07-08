package com.silvee925.erp.config;

import com.silvee925.erp.entity.Permission;
import com.silvee925.erp.entity.enums.PermissionAction;
import com.silvee925.erp.entity.enums.PermissionModule;
import com.silvee925.erp.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Seeds the fixed (module, action) permission catalog on every startup.
 * Idempotent: only inserts combinations that don't already exist.
 * Does NOT seed a default admin - the first ADMIN is created via POST /api/auth/register.
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final PermissionRepository permissionRepository;

    @Override
    @Transactional
    public void run(String... args) {
        int created = 0;
        for (PermissionModule module : PermissionModule.values()) {
            for (PermissionAction action : PermissionAction.values()) {
                if (permissionRepository.findByModuleAndAction(module, action).isEmpty()) {
                    Permission permission = new Permission();
                    permission.setModule(module);
                    permission.setAction(action);
                    permissionRepository.save(permission);
                    created++;
                }
            }
        }
        if (created > 0) {
            log.info("Seeded {} new permission catalog entries", created);
        }
    }
}
