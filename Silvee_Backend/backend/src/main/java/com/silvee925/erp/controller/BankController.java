package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.BankRequest;
import com.silvee925.erp.dto.response.BankResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.BankService;
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
@RequestMapping("/api/masters/banks")
@RequiredArgsConstructor
@Tag(name = "Bank Master", description = "Manage company bank accounts")
public class BankController {

    private final BankService bankService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new bank account")
    public ResponseEntity<ApiResponse<BankResponse>> create(@Valid @RequestBody BankRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Bank created successfully", bankService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing bank account")
    public ResponseEntity<ApiResponse<BankResponse>> update(@PathVariable Long id, @Valid @RequestBody BankRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Bank updated successfully", bankService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single bank account by id")
    public ResponseEntity<ApiResponse<BankResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Bank fetched successfully", bankService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search bank accounts with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<BankResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "bankName") Pageable pageable) {
        Page<BankResponse> page = bankService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Banks fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a bank account")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        bankService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Bank deleted successfully"));
    }
}
