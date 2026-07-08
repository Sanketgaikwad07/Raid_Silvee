-- =====================================================================================
-- Silvee925 ERP - Phase 3 schema: Category, Sub Category, Item masters (hierarchical)
-- =====================================================================================

CREATE TABLE categories (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    type            VARCHAR(30)  NULL,
    status          VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_categories_name UNIQUE (name),
    CONSTRAINT chk_categories_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_category_status ON categories (status);

CREATE TABLE sub_categories (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    category_id     BIGINT       NOT NULL,
    description     VARCHAR(255) NULL,
    status          VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_sub_category_name_per_category UNIQUE (category_id, name),
    CONSTRAINT chk_sub_categories_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT fk_sub_category_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_sub_category_status ON sub_categories (status);

CREATE TABLE items (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_code       VARCHAR(30)   NOT NULL,
    name            VARCHAR(150)  NOT NULL,
    category_id     BIGINT        NOT NULL,
    sub_category_id BIGINT        NULL,
    unit_id         BIGINT        NOT NULL,
    hsn_code        VARCHAR(10)   NULL,
    purchase_price  DECIMAL(12,2) NULL,
    selling_price   DECIMAL(12,2) NOT NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)   NOT NULL,
    updated_at      DATETIME(6)   NOT NULL,
    version         BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT uk_items_item_code UNIQUE (item_code),
    CONSTRAINT chk_items_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT chk_items_prices CHECK (selling_price >= 0 AND (purchase_price IS NULL OR purchase_price >= 0)),
    CONSTRAINT fk_item_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
    CONSTRAINT fk_item_sub_category FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id) ON DELETE RESTRICT,
    CONSTRAINT fk_item_unit FOREIGN KEY (unit_id) REFERENCES units (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_item_status ON items (status);
CREATE INDEX idx_item_category ON items (category_id);
CREATE INDEX idx_item_sub_category ON items (sub_category_id);
CREATE INDEX idx_item_unit ON items (unit_id);
