package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.TaxRequest;
import com.silvee925.erp.dto.response.TaxResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.TaxService;
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
@RequestMapping("/api/masters/taxes")
@RequiredArgsConstructor
@Tag(name = "Tax Master", description = "Manage GST tax schemes")
public class TaxController {

    private final TaxService taxService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new tax scheme")
    public ResponseEntity<ApiResponse<TaxResponse>> create(@Valid @RequestBody TaxRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tax created successfully", taxService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing tax scheme")
    public ResponseEntity<ApiResponse<TaxResponse>> update(@PathVariable Long id, @Valid @RequestBody TaxRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Tax updated successfully", taxService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single tax scheme by id")
    public ResponseEntity<ApiResponse<TaxResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Tax fetched successfully", taxService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search tax schemes with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<TaxResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<TaxResponse> page = taxService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Taxes fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a tax scheme")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        taxService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Tax deleted successfully"));
    }
}
