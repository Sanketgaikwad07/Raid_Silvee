package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.dto.request.AssignPermissionsRequest;
import com.silvee925.erp.dto.request.CreateEmployeeAccountRequest;
import com.silvee925.erp.dto.response.UserResponse;
import com.silvee925.erp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "User Management", description = "ADMIN-only: create SALES/employee accounts and manage permissions")
public class UserController {

    private final UserService userService;

    @PostMapping("/employees")
    @Operation(summary = "Create an Employee Master record plus a linked SALES login account")
    public ResponseEntity<ApiResponse<UserResponse>> createEmployeeAccount(
            @Valid @RequestBody CreateEmployeeAccountRequest request) {
        UserResponse response = userService.createEmployeeAccount(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee account created successfully", response));
    }

    @PutMapping("/{userId}/permissions")
    @Operation(summary = "Replace the full permission set granted to a SALES user")
    public ResponseEntity<ApiResponse<UserResponse>> assignPermissions(
            @PathVariable Long userId, @Valid @RequestBody AssignPermissionsRequest request) {
        UserResponse response = userService.assignPermissions(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Permissions updated successfully", response));
    }

    @GetMapping
    @Operation(summary = "List all user accounts")
    public ResponseEntity<ApiResponse<List<UserResponse>>> listUsers() {
        return ResponseEntity.ok(ApiResponse.success("Users fetched successfully", userService.listUsers()));
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get a single user account with its granted permissions")
    public ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully", userService.getUser(userId)));
    }

    @PutMapping("/{userId}/activate")
    @Operation(summary = "Activate a deactivated user account")
    public ResponseEntity<ApiResponse<UserResponse>> activate(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success("User activated successfully", userService.setActive(userId, true)));
    }

    @PutMapping("/{userId}/deactivate")
    @Operation(summary = "Deactivate a user account (blocks future logins immediately)")
    public ResponseEntity<ApiResponse<UserResponse>> deactivate(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success("User deactivated successfully", userService.setActive(userId, false)));
    }
}
