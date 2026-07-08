package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.SalesmanRequest;
import com.silvee925.erp.dto.response.SalesmanResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.SalesmanService;
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

@RestController
@RequestMapping("/api/masters/salesmen")
@RequiredArgsConstructor
@Tag(name = "Salesman Master", description = "Manage salesmen")
public class SalesmanController {

    private final SalesmanService salesmanService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new salesman")
    public ResponseEntity<ApiResponse<SalesmanResponse>> create(@Valid @RequestBody SalesmanRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Salesman created successfully", salesmanService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing salesman")
    public ResponseEntity<ApiResponse<SalesmanResponse>> update(@PathVariable Long id, @Valid @RequestBody SalesmanRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Salesman updated successfully", salesmanService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single salesman by id")
    public ResponseEntity<ApiResponse<SalesmanResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Salesman fetched successfully", salesmanService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search salesmen with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<SalesmanResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<SalesmanResponse> page = salesmanService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Salesmen fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a salesman")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        salesmanService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Salesman deleted successfully"));
    }
}
