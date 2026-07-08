package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.CompanyRequest;
import com.silvee925.erp.dto.response.CompanyResponse;
import com.silvee925.erp.entity.Company;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CompanyMapper {

    CompanyResponse toResponse(Company company);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CompanyRequest request, @MappingTarget Company company);

    default Company toEntity(CompanyRequest request) {
        Company company = new Company();
        updateEntity(request, company);
        return company;
    }
}
