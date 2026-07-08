package com.silvee925.erp.controller;

import com.silvee925.erp.common.ApiResponse;
import com.silvee925.erp.common.PagedResponse;
import com.silvee925.erp.dto.request.ItemRequest;
import com.silvee925.erp.dto.response.ItemResponse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.service.ItemService;
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
@RequestMapping("/api/masters/items")
@RequiredArgsConstructor
@Tag(name = "Item Master", description = "Manage inventory item catalog (stock levels live in the Inventory module)")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new item")
    public ResponseEntity<ApiResponse<ItemResponse>> create(@Valid @RequestBody ItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Item created successfully", itemService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing item")
    public ResponseEntity<ApiResponse<ItemResponse>> update(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Item updated successfully", itemService.update(id, request)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single item by id")
    public ResponseEntity<ApiResponse<ItemResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Item fetched successfully", itemService.get(id)));
    }

    @GetMapping
    @Operation(summary = "Search items with pagination, sorting, and optional category/status filter")
    public ResponseEntity<ApiResponse<PagedResponse<ItemResponse>>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Status status,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<ItemResponse> page = itemService.search(query, categoryId, status, pageable);
        return ResponseEntity.ok(ApiResponse.success("Items fetched successfully", PagedResponse.from(page)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete an item")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Item deleted successfully"));
    }
}
