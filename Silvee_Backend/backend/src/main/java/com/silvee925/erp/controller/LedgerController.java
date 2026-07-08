package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.LedgerRequest;
import com.silvee925.erp.dto.response.LedgerResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.LedgerService;
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
@RequestMapping("/api/masters/ledgers")
@RequiredArgsConstructor
@Tag(name = "Ledger Master", description = "Manage accounting ledgers")
public class LedgerController {

    private final LedgerService ledgerService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new ledger")
    public ResponseEntity<ApiResponse<LedgerResponse>> create(@Valid @RequestBody LedgerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Ledger created successfully", ledgerService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing ledger")
    public ResponseEntity<ApiResponse<LedgerResponse>> update(@PathVariable Long id, @Valid @RequestBody LedgerRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Ledger updated successfully", ledgerService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single ledger by id")
    public ResponseEntity<ApiResponse<LedgerResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Ledger fetched successfully", ledgerService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search ledgers with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<LedgerResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<LedgerResponse> page = ledgerService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Ledgers fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a ledger")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        ledgerService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Ledger deleted successfully"));
    }
}
