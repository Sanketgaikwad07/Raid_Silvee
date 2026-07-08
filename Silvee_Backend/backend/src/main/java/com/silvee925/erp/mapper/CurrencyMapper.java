package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.CurrencyRequest;
import com.silvee925.erp.dto.response.CurrencyResponse;
import com.silvee925.erp.entity.Currency;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CurrencyMapper {

    CurrencyResponse toResponse(Currency currency);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CurrencyRequest request, @MappingTarget Currency currency);

    default Currency toEntity(CurrencyRequest request) {
        Currency currency = new Currency();
        updateEntity(request, currency);
        return currency;
    }
}
