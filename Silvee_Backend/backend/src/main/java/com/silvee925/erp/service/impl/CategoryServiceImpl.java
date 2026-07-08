package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.CategoryRequest;
import com.silvee925.erp.dto.response.CategoryResponse;
import com.silvee925.erp.entity.Category;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.CategoryMapper;
import com.silvee925.erp.repository.CategoryRepository;
import com.silvee925.erp.repository.SubCategoryRepository;
import com.silvee925.erp.repository.ItemRepository;
import com.silvee925.erp.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ItemRepository itemRepository;
    private final CategoryMapper categoryMapper;

    @Override
    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        if (categoryRepository.existsByNameIgnoreCase(request.name())) {
            throw new DuplicateResourceException("Category '" + request.name() + "' already exists");
        }
        Category category = categoryRepository.save(categoryMapper.toEntity(request));
        log.info("Category created: {}", category.getName());
        return categoryMapper.toResponse(category);
    }

    @Override
    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = findOrThrow(id);
        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(request.name(), id)) {
            throw new DuplicateResourceException("Category '" + request.name() + "' already exists");
        }
        categoryMapper.updateEntity(request, category);
        category = categoryRepository.save(category);
        log.info("Category updated: {}", category.getName());
        return categoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse get(Long id) {
        return categoryMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<CategoryResponse> search(String query, Status status, Pageable pageable) {
        Specification<Category> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + query.toLowerCase() + "%"));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return categoryRepository.findAll(spec, pageable).map(categoryMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Category category = findOrThrow(id);
        if (subCategoryRepository.existsByCategoryId(id) || itemRepository.existsByCategoryId(id)) {
            throw new BadRequestException("Cannot delete a category that has sub-categories or items linked to it");
        }
        categoryRepository.delete(category);
        log.info("Category deleted: {}", category.getName());
    }

    private Category findOrThrow(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Category", id));
    }
}
