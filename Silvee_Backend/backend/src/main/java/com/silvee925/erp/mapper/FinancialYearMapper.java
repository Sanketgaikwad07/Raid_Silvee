package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.FinancialYearRequest;
import com.silvee925.erp.dto.response.FinancialYearResponse;
import com.silvee925.erp.entity.FinancialYear;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface FinancialYearMapper {

    FinancialYearResponse toResponse(FinancialYear financialYear);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(FinancialYearRequest request, @MappingTarget FinancialYear financialYear);

    default FinancialYear toEntity(FinancialYearRequest request) {
        FinancialYear financialYear = new FinancialYear();
        updateEntity(request, financialYear);
        return financialYear;
    }
}
