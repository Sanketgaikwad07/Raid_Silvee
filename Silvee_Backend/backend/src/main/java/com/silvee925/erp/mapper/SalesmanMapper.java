package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.SalesmanRequest;
import com.silvee925.erp.dto.response.SalesmanResponse;
import com.silvee925.erp.entity.Salesman;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface SalesmanMapper {

    SalesmanResponse toResponse(Salesman salesman);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(SalesmanRequest request, @MappingTarget Salesman salesman);

    default Salesman toEntity(SalesmanRequest request) {
        Salesman salesman = new Salesman();
        updateEntity(request, salesman);
        return salesman;
    }
}
