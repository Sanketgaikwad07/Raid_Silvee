package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.WarehouseRequest;
import com.silvee925.erp.dto.response.WarehouseResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.WarehouseService;
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
@RequestMapping("/api/masters/warehouses")
@RequiredArgsConstructor
@Tag(name = "Warehouse Master", description = "Manage warehouse locations")
public class WarehouseController {

    private final WarehouseService warehouseService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new warehouse")
    public ResponseEntity<ApiResponse<WarehouseResponse>> create(@Valid @RequestBody WarehouseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Warehouse created successfully", warehouseService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing warehouse")
    public ResponseEntity<ApiResponse<WarehouseResponse>> update(@PathVariable Long id, @Valid @RequestBody WarehouseRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Warehouse updated successfully", warehouseService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single warehouse by id")
    public ResponseEntity<ApiResponse<WarehouseResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Warehouse fetched successfully", warehouseService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search warehouses with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<WarehouseResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<WarehouseResponse> page = warehouseService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Warehouses fetched successfully", PagedResponse.from(page)));
    }

    @PutMapping("/{id}/set-default")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Mark this warehouse as the default warehouse")
    public ResponseEntity<ApiResponse<WarehouseResponse>> setDefault(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Default warehouse updated successfully", warehouseService.setDefault(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a warehouse (rejected if it is the default and others exist)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        warehouseService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Warehouse deleted successfully"));
    }
}
