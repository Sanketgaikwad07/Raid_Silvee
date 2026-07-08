package com.silvee925.erp.service;

import com.silvee925.erp.dto.request.ItemRequest;
import com.silvee925.erp.dto.response.ItemResponse;
import com.silvee925.erp.entity.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemService {

    ItemResponse create(ItemRequest request);

    ItemResponse update(Long id, ItemRequest request);

    ItemResponse get(Long id);

    Page<ItemResponse> search(String query, Long categoryId, Status status, Pageable pageable);

    void delete(Long id);
}
