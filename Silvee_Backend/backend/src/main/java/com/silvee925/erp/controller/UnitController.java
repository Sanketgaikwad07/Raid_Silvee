package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.UnitRequest;
import com.silvee925.erp.dto.response.UnitResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.UnitService;
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
@RequestMapping("/api/masters/units")
@RequiredArgsConstructor
@Tag(name = "Unit Master", description = "Manage units of measurement")
public class UnitController {

    private final UnitService unitService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new unit of measurement")
    public ResponseEntity<ApiResponse<UnitResponse>> create(@Valid @RequestBody UnitRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Unit created successfully", unitService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing unit")
    public ResponseEntity<ApiResponse<UnitResponse>> update(@PathVariable Long id, @Valid @RequestBody UnitRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Unit updated successfully", unitService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single unit by id")
    public ResponseEntity<ApiResponse<UnitResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Unit fetched successfully", unitService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search units with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<UnitResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<UnitResponse> page = unitService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Units fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a unit")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        unitService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Unit deleted successfully"));
    }
}
