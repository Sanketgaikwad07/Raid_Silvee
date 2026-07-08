package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.TaxRequest;
import com.silvee925.erp.dto.response.TaxResponse;
import com.silvee925.erp.entity.Tax;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Manual mapper: CGST/SGST/IGST are derived from ratePercentage (standard GST split),
 * not stored columns, so this can't be a straight MapStruct bean-to-bean mapping.
 */
@Component
public class TaxMapper {

    private static final BigDecimal TWO = BigDecimal.valueOf(2);

    public Tax toEntity(TaxRequest request) {
        Tax tax = new Tax();
        applyRequest(request, tax);
        return tax;
    }

    public void updateEntity(TaxRequest request, Tax tax) {
        applyRequest(request, tax);
    }

    public TaxResponse toResponse(Tax tax) {
        BigDecimal rate = tax.getRatePercentage();
        BigDecimal half = rate.divide(TWO, 2, RoundingMode.HALF_UP);
        return new TaxResponse(
                tax.getId(),
                tax.getName(),
                tax.getCode(),
                rate,
                half,
                half,
                rate,
                tax.getStatus(),
                tax.getCreatedAt(),
                tax.getUpdatedAt()
        );
    }

    private void applyRequest(TaxRequest request, Tax tax) {
        tax.setName(request.name());
        tax.setCode(request.code());
        tax.setRatePercentage(request.ratePercentage());
        tax.setStatus(request.status());
    }
}
