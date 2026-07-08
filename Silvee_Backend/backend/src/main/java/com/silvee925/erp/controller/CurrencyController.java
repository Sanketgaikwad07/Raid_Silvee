package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.CurrencyRequest;
import com.silvee925.erp.dto.response.CurrencyResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.CurrencyService;
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
@RequestMapping("/api/masters/currencies")
@RequiredArgsConstructor
@Tag(name = "Currency Master", description = "Manage currencies")
public class CurrencyController {

    private final CurrencyService currencyService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new currency")
    public ResponseEntity<ApiResponse<CurrencyResponse>> create(@Valid @RequestBody CurrencyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Currency created successfully", currencyService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing currency")
    public ResponseEntity<ApiResponse<CurrencyResponse>> update(@PathVariable Long id, @Valid @RequestBody CurrencyRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Currency updated successfully", currencyService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single currency by id")
    public ResponseEntity<ApiResponse<CurrencyResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Currency fetched successfully", currencyService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search currencies with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<CurrencyResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<CurrencyResponse> page = currencyService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Currencies fetched successfully", PagedResponse.from(page)));
    }

    @PutMapping("/{id}/set-default")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Mark this currency as the default currency")
    public ResponseEntity<ApiResponse<CurrencyResponse>> setDefault(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Default currency updated successfully", currencyService.setDefault(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a currency (rejected if it is the default and others exist)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        currencyService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Currency deleted successfully"));
    }
}
