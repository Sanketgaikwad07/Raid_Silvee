package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.UnitRequest;
import com.silvee925.erp.dto.response.UnitResponse;
import com.silvee925.erp.entity.MeasurementUnit;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UnitMapper {

    UnitResponse toResponse(MeasurementUnit unit);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(UnitRequest request, @MappingTarget MeasurementUnit unit);

    default MeasurementUnit toEntity(UnitRequest request) {
        MeasurementUnit unit = new MeasurementUnit();
        updateEntity(request, unit);
        return unit;
    }
}
