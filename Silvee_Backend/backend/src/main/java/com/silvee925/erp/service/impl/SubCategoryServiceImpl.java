package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.SubCategoryRequest;
import com.silvee925.erp.dto.response.SubCategoryResponse;
import com.silvee925.erp.entity.Category;
import com.silvee925.erp.entity.SubCategory;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.SubCategoryMapper;
import com.silvee925.erp.repository.CategoryRepository;
import com.silvee925.erp.repository.ItemRepository;
import com.silvee925.erp.repository.SubCategoryRepository;
import com.silvee925.erp.service.SubCategoryService;
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
public class SubCategoryServiceImpl implements SubCategoryService {

    private static final Logger log = LoggerFactory.getLogger(SubCategoryServiceImpl.class);

    private final SubCategoryRepository subCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final SubCategoryMapper subCategoryMapper;

    @Override
    @Transactional
    public SubCategoryResponse create(SubCategoryRequest request) {
        Category category = findCategoryOrThrow(request.categoryId());
        if (subCategoryRepository.existsByCategoryIdAndNameIgnoreCase(request.categoryId(), request.name())) {
            throw new DuplicateResourceException(
                    "Sub category '" + request.name() + "' already exists under category '" + category.getName() + "'");
        }

        SubCategory subCategory = new SubCategory();
        subCategory.setCategory(category);
        subCategoryMapper.applyFields(request, subCategory);
        subCategory = subCategoryRepository.save(subCategory);

        log.info("Sub category created: {} under {}", subCategory.getName(), category.getName());
        return subCategoryMapper.toResponse(subCategory);
    }

    @Override
    @Transactional
    public SubCategoryResponse update(Long id, SubCategoryRequest request) {
        SubCategory subCategory = findOrThrow(id);
        Category category = findCategoryOrThrow(request.categoryId());
        if (subCategoryRepository.existsByCategoryIdAndNameIgnoreCaseAndIdNot(request.categoryId(), request.name(), id)) {
            throw new DuplicateResourceException(
                    "Sub category '" + request.name() + "' already exists under category '" + category.getName() + "'");
        }

        subCategory.setCategory(category);
        subCategoryMapper.applyFields(request, subCategory);
        subCategory = subCategoryRepository.save(subCategory);

        log.info("Sub category updated: {} under {}", subCategory.getName(), category.getName());
        return subCategoryMapper.toResponse(subCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public SubCategoryResponse get(Long id) {
        return subCategoryMapper.toResponse(findOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SubCategoryResponse> search(String query, Long categoryId, Status status, Pageable pageable) {
        Specification<SubCategory> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + query.toLowerCase() + "%"));
            }
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return subCategoryRepository.findAll(spec, pageable).map(subCategoryMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SubCategory subCategory = findOrThrow(id);
        if (itemRepository.existsBySubCategoryId(id)) {
            throw new BadRequestException("Cannot delete a sub category that has items linked to it");
        }
        subCategoryRepository.delete(subCategory);
        log.info("Sub category deleted: {}", subCategory.getName());
    }

    private SubCategory findOrThrow(Long id) {
        return subCategoryRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Sub Category", id));
    }

    private Category findCategoryOrThrow(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", categoryId));
    }
}
