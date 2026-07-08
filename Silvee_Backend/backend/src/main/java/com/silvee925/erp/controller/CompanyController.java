package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.CompanyRequest;
import com.silvee925.erp.dto.response.CompanyResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.CompanyService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/masters/companies")
@RequiredArgsConstructor
@Tag(name = "Company Master", description = "Manage the companies (business units) operating in the system")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new company")
    public ResponseEntity<ApiResponse<CompanyResponse>> create(@Valid @RequestBody CompanyRequest request) {
        CompanyResponse response = companyService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Company created successfully", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing company")
    public ResponseEntity<ApiResponse<CompanyResponse>> update(
            @PathVariable Long id, @Valid @RequestBody CompanyRequest request) {
        CompanyResponse response = companyService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Company updated successfully", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single company by id")
    public ResponseEntity<ApiResponse<CompanyResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Company fetched successfully", companyService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search companies with pagination, sorting, and optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<CompanyResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "companyName") Pageable pageable) {
        Page<CompanyResponse> page = companyService.search(query, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Companies fetched successfully", PagedResponse.from(page)));
    }

    @PutMapping("/{id}/set-default")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Mark this company as the default company (unsets any previous default)")
    public ResponseEntity<ApiResponse<CompanyResponse>> setDefault(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Default company updated successfully", companyService.setDefault(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a company (rejected if it is the default company and others exist)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Company deleted successfully"));
    }
}
