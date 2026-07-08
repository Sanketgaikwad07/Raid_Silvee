package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.SupplierRequest;
import com.silvee925.erp.dto.response.SupplierResponse;
import com.silvee925.erp.entity.Supplier;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface SupplierMapper {

    SupplierResponse toResponse(Supplier supplier);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(SupplierRequest request, @MappingTarget Supplier supplier);

    default Supplier toEntity(SupplierRequest request) {
        Supplier supplier = new Supplier();
        updateEntity(request, supplier);
        return supplier;
    }
}
