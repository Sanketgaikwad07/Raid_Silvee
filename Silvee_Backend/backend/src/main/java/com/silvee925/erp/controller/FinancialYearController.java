package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.FinancialYearRequest;
import com.silvee925.erp.dto.response.FinancialYearResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.FinancialYearService;
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
@RequestMapping("/api/masters/financial-years")
@RequiredArgsConstructor
@Tag(name = "Financial Year Master", description = "Manage financial year periods")
public class FinancialYearController {

    private final FinancialYearService financialYearService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new financial year (rejected on overlapping date ranges)")
    public ResponseEntity<ApiResponse<FinancialYearResponse>> create(@Valid @RequestBody FinancialYearRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Financial year created successfully", financialYearService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing financial year")
    public ResponseEntity<ApiResponse<FinancialYearResponse>> update(
            @PathVariable Long id, @Valid @RequestBody FinancialYearRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Financial year updated successfully", financialYearService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single financial year by id")
    public ResponseEntity<ApiResponse<FinancialYearResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Financial year fetched successfully", financialYearService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search financial years with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<FinancialYearResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "startDate", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        Page<FinancialYearResponse> page = financialYearService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Financial years fetched successfully", PagedResponse.from(page)));
    }

    @PutMapping("/{id}/set-active")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Activate this financial year (new transactions post against it)")
    public ResponseEntity<ApiResponse<FinancialYearResponse>> setActive(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Financial year activated successfully", financialYearService.setActive(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a financial year (rejected if it is active and others exist)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        financialYearService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Financial year deleted successfully"));
    }
}
