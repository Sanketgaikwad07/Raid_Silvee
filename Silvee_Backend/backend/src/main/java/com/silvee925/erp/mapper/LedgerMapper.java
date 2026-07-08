package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.LedgerRequest;
import com.silvee925.erp.dto.response.LedgerResponse;
import com.silvee925.erp.entity.Ledger;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface LedgerMapper {

    LedgerResponse toResponse(Ledger ledger);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(LedgerRequest request, @MappingTarget Ledger ledger);

    default Ledger toEntity(LedgerRequest request) {
        Ledger ledger = new Ledger();
        updateEntity(request, ledger);
        return ledger;
    }
}
