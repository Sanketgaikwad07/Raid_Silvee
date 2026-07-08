package com.silvee925.erp.repository;

import com.silvee925.erp.entity.User;
import com.silvee925.erp.entity.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByRole(RoleType role);

    boolean existsByEmployeeId(Long employeeId);
}
