package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.CustomerRequest;
import com.silvee925.erp.dto.response.CustomerResponse;
import com.silvee925.erp.entity.Customer;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    CustomerResponse toResponse(Customer customer);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CustomerRequest request, @MappingTarget Customer customer);

    default Customer toEntity(CustomerRequest request) {
        Customer customer = new Customer();
        updateEntity(request, customer);
        return customer;
    }
}
