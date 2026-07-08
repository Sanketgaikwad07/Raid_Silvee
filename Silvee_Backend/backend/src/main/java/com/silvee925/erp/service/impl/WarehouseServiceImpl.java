package com.silvee925.erp.service.impl;

import com.silvee925.erp.dto.request.WarehouseRequest;
import com.silvee925.erp.dto.response.WarehouseResponse;
import com.silvee925.erp.entity.Warehouse;
import com.silvee925.erp.entity.enums.Status;
import com.silvee925.erp.exception.BadRequestException;
import com.silvee925.erp.exception.DuplicateResourceException;
import com.silvee925.erp.exception.ResourceNotFoundException;
import com.silvee925.erp.mapper.WarehouseMapper;
import com.silvee925.erp.repository.WarehouseRepository;
import com.silvee925.erp.service.WarehouseService;
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
public class WarehouseServiceImpl implements WarehouseService {

    private static final Logger log = LoggerFactory.getLogger(WarehouseServiceImpl.class);

    private final WarehouseRepository warehouseRepository;
    private final WarehouseMapper warehouseMapper;

    @Override
    @Transactional
    public WarehouseResponse create(WarehouseRequest request) {
        if (warehouseRepository.existsByWarehouseCodeIgnoreCase(request.warehouseCode())) {
            throw new DuplicateResourceException("Warehouse code '" + request.warehouseCode() + "' already exists");
        }
        boolean isFirst = warehouseRepository.count() == 0;
        Warehouse warehouse = warehouseMapper.toEntity(request);
        if (isFirst || warehouse.isDefaultWarehouse()) {
            clearExistingDefault();
            warehouse.setDefaultWarehouse(true);
        }
        warehouse = warehouseRepository.save(warehouse);
        log.info("Warehouse created: {} ({})", warehouse.getName(), warehouse.getWarehouseCode());
        return warehouseMapper.toResponse(warehouse);
    }

    @Override
    @Transactional
    public WarehouseResponse update(Long id, WarehouseRequest request) {
        Warehouse warehouse = findOrThrow(id);
        if (warehouseRepository.existsByWarehouseCodeIgnoreCaseAndIdNot(request.warehouseCode(), id)) {
            throw new DuplicateResourceException("Warehouse code '" + request.warehouseCode() + "' already exists");
        }

        boolean wasDefault = warehouse.isDefaultWarehouse();
        warehouseMapper.updateEntity(request, warehouse);

        if (warehouse.isDefaultWarehouse() && !wasDefault) {
            clearExistingDefault();
            warehouse.setDefaultWarehouse(true);
        } else if (!warehouse.isDefaultWarehouse() && wasDefault && warehouseRepository.count() > 1) {
            throw new BadRequestException("Cannot unset the default warehouse directly; set another warehouse as default instead");
        } else if (wasDefault) {
            warehouse.setDefaultWarehouse(true);
        }

        warehouse = warehouseRepository.save(warehouse);
        log.info("Warehouse updated: {} ({})", warehouse.getName(), warehouse.getWarehouseCode());
        return warehouseMapper.toResponse(warehouse);
    }

    @Override
    public WarehouseResponse get(Long id) {
        return warehouseMapper.toResponse(findOrThrow(id));
    }

    @Override
    public Page<WarehouseResponse> search(String query, Status status, Pageable pageable) {
        Specification<Warehouse> spec = (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(query)) {
                String like = "%" + query.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("warehouseCode")), like)
                ));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return warehouseRepository.findAll(spec, pageable).map(warehouseMapper::toResponse);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Warehouse warehouse = findOrThrow(id);
        if (warehouse.isDefaultWarehouse() && warehouseRepository.count() > 1) {
            throw new BadRequestException("Cannot delete the default warehouse; set another warehouse as default first");
        }
        warehouseRepository.delete(warehouse);
        log.info("Warehouse deleted: {} ({})", warehouse.getName(), warehouse.getWarehouseCode());
    }

    @Override
    @Transactional
    public WarehouseResponse setDefault(Long id) {
        Warehouse warehouse = findOrThrow(id);
        clearExistingDefault();
        warehouse.setDefaultWarehouse(true);
        warehouse = warehouseRepository.save(warehouse);
        log.info("Warehouse set as default: {} ({})", warehouse.getName(), warehouse.getWarehouseCode());
        return warehouseMapper.toResponse(warehouse);
    }

    private void clearExistingDefault() {
        warehouseRepository.findAll(isDefaultSpec()).forEach(w -> {
            w.setDefaultWarehouse(false);
            warehouseRepository.save(w);
        });
    }

    private Specification<Warehouse> isDefaultSpec() {
        return (root, cq, cb) -> cb.isTrue(root.get("defaultWarehouse"));
    }

    private Warehouse findOrThrow(Long id) {
        return warehouseRepository.findById(id).orElseThrow(() -> ResourceNotFoundException.of("Warehouse", id));
    }
}
