package com.silvee925.erp.mapper;

import com.silvee925.erp.dto.request.ItemRequest;
import com.silvee925.erp.dto.response.ItemResponse;
import com.silvee925.erp.entity.Item;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Manual mapper: category/subCategory/unit associations are resolved and validated in the
 * service layer (they need repository lookups), so this only maps the item's own fields.
 */
@Component
public class ItemMapper {

    public void applyFields(ItemRequest request, Item item) {
        item.setItemCode(request.itemCode());
        item.setName(request.name());
        // Normalize blank to null so the column is either a real HSN code or NULL, never "".
        item.setHsnCode(StringUtils.hasText(request.hsnCode()) ? request.hsnCode() : null);
        item.setPurchasePrice(request.purchasePrice());
        item.setSellingPrice(request.sellingPrice());
        item.setStatus(request.status());
    }

    public ItemResponse toResponse(Item item) {
        return new ItemResponse(
                item.getId(),
                item.getItemCode(),
                item.getName(),
                item.getCategory().getId(),
                item.getCategory().getName(),
                item.getSubCategory() != null ? item.getSubCategory().getId() : null,
                item.getSubCategory() != null ? item.getSubCategory().getName() : null,
                item.getUnit().getId(),
                item.getUnit().getName(),
                item.getHsnCode(),
                item.getPurchasePrice(),
                item.getSellingPrice(),
                item.getStatus(),
                item.getCreatedAt(),
                item.getUpdatedAt()
        );
    }
}
