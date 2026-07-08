package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.EmployeeRequest;
import com.silvee925.erp.dto.response.EmployeeResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Standalone Employee Master CRUD (an HR record). This is distinct from
 * {@code POST /api/users/employees}, which creates a linked SALES login account for
 * an employee - that flow creates its own Employee row internally when needed.
 */
@RestController
@RequestMapping("/api/masters/employees")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Employee Master", description = "Manage employee HR records (ADMIN only)")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @Operation(summary = "Create a new employee record")
    public ResponseEntity<ApiResponse<EmployeeResponse>> create(@Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee created successfully", employeeService.create(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing employee record")
    public ResponseEntity<ApiResponse<EmployeeResponse>> update(@PathVariable Long id, @Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Employee updated successfully", employeeService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single employee by id")
    public ResponseEntity<ApiResponse<EmployeeResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Employee fetched successfully", employeeService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search employees with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<EmployeeResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "fullName") Pageable pageable) {
        Page<EmployeeResponse> page = employeeService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Employees fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an employee record (rejected if a user account is linked)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Employee deleted successfully"));
    }
}
