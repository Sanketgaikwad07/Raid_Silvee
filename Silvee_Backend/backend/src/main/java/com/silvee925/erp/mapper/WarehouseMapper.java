package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.WarehouseRequest;
import com.silvee925.erp.dto.response.WarehouseResponse;
import com.silvee925.erp.entity.Warehouse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface WarehouseMapper {

    WarehouseResponse toResponse(Warehouse warehouse);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(WarehouseRequest request, @MappingTarget Warehouse warehouse);

    default Warehouse toEntity(WarehouseRequest request) {
        Warehouse warehouse = new Warehouse();
        updateEntity(request, warehouse);
        return warehouse;
    }
}
