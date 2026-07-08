package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.ItemRequest;
import com.silvee925.erp.dto.response.ItemResponse;
import com.silvee925.erp.entity.Category;
import com.silvee925.erp.entity.Item;
import com.silvee925.erp.entity.MeasurementUnit;
import com.silvee925.erp.entity.SubCategory;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.ItemMapper;
import com.silvee925.erp.repository.CategoryRepository;
import com.silvee925.erp.repository.ItemRepository;
import com.silvee925.erp.repository.MeasurementUnitRepository;
import com.silvee925.erp.repository.SubCategoryRepository;
import com.silvee925.erp.service.ItemService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private static final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final MeasurementUnitRepository unitRepository;
    private final ItemMapper itemMapper;

    @Override
    @Transactional
    public ItemResponse create(ItemRequest request) {
        if (itemRepository.existsByItemCodeIgnoreCase(request.itemCode())) {
            throw new DuplicateResourceException("Item code '" + request.itemCode() + "' already exists");
        }

        Category category = findCategoryOrThrow(request.categoryId());
        SubCategory subCategory = resolveSubCategory(request.subCategoryId(), category);
        MeasurementUnit unit = findUnitOrThrow(request.unitId());

        Item item = new Item();
        item.setCategory(category);
        item.setSubCategory(subCategory);
        item.setUnit(unit);
        itemMapper.applyFields(request, item);
        item = itemRepository.save(item);

        log.info("Item created: {} ({})", item.getName(), item.getItemCode());
        return itemMapper.toResponse(item);
    }

    @Override
    @Transactional
    public ItemResponse update(Long id, ItemRequest request) {
        Item item = findOrThrow(id);
        if (itemRepository.existsByItemCodeIgnoreCaseAndIdNot(request.itemCode(), id)) {
            throw new DuplicateResourceException("Item code '" + request.itemCode() + "' already exists");
        }

        Category category = findCategoryOrThrow(request.categoryId());
        SubCategory subCategory = resolveSubCategory(request.subCategoryId(), category);
        MeasurementUnit unit = findUnitOrThrow(request.unitId());

        item.setCategory(category);
        item.setSubCategory(subCategory);
        item.setUnit(unit);
        itemMapper.applyFields(request, item);
        item = itemRepository.save(item);

        log.info("Item updated: {} ({})", item.getName(), item.getItemCode());
        return itemMapper.toResponse(item);
    }

    @Override
    @Transactional(readOnly = true)
    public ItemResponse get(Long id) {
        return itemMapper.toResponse(findOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ItemResponse> search(String query, Long categoryId, Status status, Pageable pageable) {
        Specification<Item> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("itemCode")), like)
                ));
            }
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return itemRepository.findAll(spec, pageable).map(itemMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Item item = findOrThrow(id);
        itemRepository.delete(item);
        log.info("Item deleted: {} ({})", item.getName(), item.getItemCode());
    }

    private SubCategory resolveSubCategory(Long subCategoryId, Category category) {
        if (subCategoryId == null) {
            return null;
        }
        SubCategory subCategory = subCategoryRepository.findById(subCategoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Sub Category", subCategoryId));
        if (!subCategory.getCategory().getId().equals(category.getId())) {
            throw new BadRequestException(
                    "Sub category '" + subCategory.getName() + "' does not belong to category '" + category.getName() + "'");
        }
        return subCategory;
    }

    private Item findOrThrow(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Item", id));
    }

    private Category findCategoryOrThrow(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", categoryId));
    }

    private MeasurementUnit findUnitOrThrow(Long unitId) {
        return unitRepository.findById(unitId)
                .orElseThrow(() -> ResourceNotFoundException.of("Unit", unitId));
    }
}
