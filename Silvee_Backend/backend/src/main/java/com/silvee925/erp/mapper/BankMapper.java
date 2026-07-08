package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.BankRequest;
import com.silvee925.erp.dto.response.BankResponse;
import com.silvee925.erp.entity.Bank;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface BankMapper {

    BankResponse toResponse(Bank bank);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(BankRequest request, @MappingTarget Bank bank);

    default Bank toEntity(BankRequest request) {
        Bank bank = new Bank();
        updateEntity(request, bank);
        return bank;
    }
}
