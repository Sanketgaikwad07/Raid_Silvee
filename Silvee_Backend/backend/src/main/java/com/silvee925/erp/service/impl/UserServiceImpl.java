package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.AssignPermissionsRequest;
import com.silvee925.erp.dto.request.CreateEmployeeAccountRequest;
import com.silvee925.erp.dto.request.PermissionGrantRequest;
import com.silvee925.erp.dto.response.UserResponse;
import com.silvee925.erp.entity.Employee;
import com.silvee925.erp.entity.Permission;
import com.silvee925.erp.entity.User;
import com.silvee925.erp.entity.UserPermission;
import com.silvee925.erp.entity.enums.RoleType;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.UserMapper;
import com.silvee925.erp.repository.EmployeeRepository;
import com.silvee925.erp.repository.PermissionRepository;
import com.silvee925.erp.repository.UserPermissionRepository;
import com.silvee925.erp.repository.UserRepository;
import com.silvee925.erp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PermissionRepository permissionRepository;
    private final UserPermissionRepository userPermissionRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserResponse createEmployeeAccount(CreateEmployeeAccountRequest request) {
        if (employeeRepository.existsByEmployeeCodeIgnoreCase(request.employeeCode())) {
            throw new DuplicateResourceException("An employee with code '" + request.employeeCode() + "' already exists");
        }
        if (employeeRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("An employee with email '" + request.email() + "' already exists");
        }
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException("A user account with email '" + request.email() + "' already exists");
        }

        Employee employee = new Employee();
        employee.setEmployeeCode(request.employeeCode());
        employee.setFullName(request.fullName());
        employee.setDesignation(request.designation());
        employee.setPhone(request.phone());
        employee.setEmail(request.email());
        employee.setStatus(Status.ACTIVE);
        employeeRepository.save(employee);

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(RoleType.SALES);
        user.setEmployee(employee);
        user.setActive(true);
        userRepository.save(user);

        List<UserPermission> grants = grantPermissions(user, request.permissions());

        log.info("ADMIN created SALES account for employee {} ({})", employee.getEmployeeCode(), user.getEmail());
        return userMapper.toResponse(user, grants);
    }

    @Override
    @Transactional
    public UserResponse assignPermissions(Long userId, AssignPermissionsRequest request) {
        User user = getSalesUserOrThrow(userId);

        userPermissionRepository.deleteAllByUserId(userId);
        List<UserPermission> grants = grantPermissions(user, request.permissions());

        log.info("Permissions updated for user {}: {} grant(s)", user.getEmail(), grants.size());
        return userMapper.toResponse(user, grants);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> listUsers() {
        return userRepository.findAll().stream()
                .map(u -> userMapper.toResponse(u, userPermissionRepository.findAllByUserId(u.getId())))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        return userMapper.toResponse(user, userPermissionRepository.findAllByUserId(userId));
    }

    @Override
    @Transactional
    public UserResponse setActive(Long userId, boolean active) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        user.setActive(active);
        userRepository.save(user);
        log.info("User {} set to active={}", user.getEmail(), active);
        return userMapper.toResponse(user, userPermissionRepository.findAllByUserId(userId));
    }

    private User getSalesUserOrThrow(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        if (user.getRole() != RoleType.SALES) {
            throw new BadRequestException("Granular permissions only apply to SALES accounts; ADMIN has full access");
        }
        return user;
    }

    private List<UserPermission> grantPermissions(User user, List<PermissionGrantRequest> requested) {
        return requested.stream()
                .map(pg -> {
                    Permission permission = permissionRepository.findByModuleAndAction(pg.module(), pg.action())
                            .orElseThrow(() -> new ResourceNotFoundException(
                                    "Permission not found for module=" + pg.module() + ", action=" + pg.action()));
                    UserPermission grant = new UserPermission();
                    grant.setUser(user);
                    grant.setPermission(permission);
                    return userPermissionRepository.save(grant);
                })
                .toList();
    }
}
