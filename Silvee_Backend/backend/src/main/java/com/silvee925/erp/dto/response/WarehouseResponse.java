package com.silvee925.erp.dto.response;

import com.silvee925.erp.entity.enums.Status;

import java.time.LocalDateTime;

public record WarehouseResponse(
        Long id,
        String warehouseCode,
        String name,
        String location,
        Integer capacity,
        boolean defaultWarehouse,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
