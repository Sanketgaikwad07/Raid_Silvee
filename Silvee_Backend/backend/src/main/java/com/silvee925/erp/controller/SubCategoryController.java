package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.SubCategoryRequest;
import com.silvee925.erp.dto.response.SubCategoryResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.SubCategoryService;
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
@RequestMapping("/api/masters/sub-categories")
@RequiredArgsConstructor
@Tag(name = "Sub Category Master", description = "Manage item sub-categories, scoped to a parent category")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new sub category under a category")
    public ResponseEntity<ApiResponse<SubCategoryResponse>> create(@Valid @RequestBody SubCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Sub category created successfully", subCategoryService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing sub category")
    public ResponseEntity<ApiResponse<SubCategoryResponse>> update(
            @PathVariable Long id, @Valid @RequestBody SubCategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Sub category updated successfully", subCategoryService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single sub category by id")
    public ResponseEntity<ApiResponse<SubCategoryResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Sub category fetched successfully", subCategoryService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search sub categories with pagination, sorting, and optional category/status filter")
    public ResponseEntity<ApiResponse<PagedResponse<SubCategoryResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<SubCategoryResponse> page = subCategoryService.search(query, categoryId, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Sub categories fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a sub category (rejected if items reference it)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        subCategoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Sub category deleted successfully"));
    }
}
