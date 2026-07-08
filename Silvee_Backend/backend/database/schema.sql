-- =====================================================================================
-- Silvee925 ERP - Phase 1 schema: Authentication, Authorization, Employee, Company Master
-- =====================================================================================

-- ---------------------------------------------------------------------------
-- employees: Employee Master. Referenced by users.employee_id for SALES accounts.
-- ---------------------------------------------------------------------------
CREATE TABLE employees (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_code   VARCHAR(20)  NOT NULL,
    full_name       VARCHAR(100) NOT NULL,
    designation     VARCHAR(50)  NULL,
    phone           VARCHAR(20)  NOT NULL,
    email           VARCHAR(100) NULL,
    status          VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_employees_code UNIQUE (employee_code),
    CONSTRAINT uk_employees_email UNIQUE (email),
    CONSTRAINT chk_employees_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_employee_status ON employees (status);
CREATE INDEX idx_employee_phone ON employees (phone);

-- ---------------------------------------------------------------------------
-- users: authentication principals. Only ADMIN and SALES roles may log in.
-- ---------------------------------------------------------------------------
CREATE TABLE users (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(100) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    full_name       VARCHAR(100) NOT NULL,
    role            VARCHAR(20)  NOT NULL,
    employee_id     BIGINT       NULL,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    last_login_at   DATETIME(6)  NULL,
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT chk_users_role CHECK (role IN ('ADMIN', 'SALES')),
    CONSTRAINT fk_users_employee FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_user_role ON users (role);

-- ---------------------------------------------------------------------------
-- refresh_tokens: opaque, rotated, revocable tokens backing /api/auth/refresh-token.
-- ---------------------------------------------------------------------------
CREATE TABLE refresh_tokens (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT       NOT NULL,
    token           VARCHAR(512) NOT NULL,
    expiry_date     DATETIME(6)  NOT NULL,
    revoked         BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_refresh_token UNIQUE (token),
    CONSTRAINT fk_refresh_token_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_refresh_token_user ON refresh_tokens (user_id);
-- Speeds up the periodic cleanup of expired/revoked tokens.
CREATE INDEX idx_refresh_token_expiry ON refresh_tokens (expiry_date, revoked);

-- ---------------------------------------------------------------------------
-- permissions: fixed (module, action) catalog, seeded by DataInitializer at boot.
-- ---------------------------------------------------------------------------
CREATE TABLE permissions (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    module          VARCHAR(30) NOT NULL,
    action          VARCHAR(20) NOT NULL,
    created_at      DATETIME(6) NOT NULL,
    updated_at      DATETIME(6) NOT NULL,
    version         BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT uk_permission_module_action UNIQUE (module, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- user_permissions: per-SALES-user permission grants. ADMIN bypasses this matrix.
-- ---------------------------------------------------------------------------
CREATE TABLE user_permissions (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT      NOT NULL,
    permission_id   BIGINT      NOT NULL,
    created_at      DATETIME(6) NOT NULL,
    updated_at      DATETIME(6) NOT NULL,
    version         BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT uk_user_permission UNIQUE (user_id, permission_id),
    CONSTRAINT fk_user_permission_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_permission_permission FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_user_permission_user ON user_permissions (user_id);

-- ---------------------------------------------------------------------------
-- companies: Company Master - the business units the ERP operates on behalf of.
-- ---------------------------------------------------------------------------
CREATE TABLE companies (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_code    VARCHAR(20)  NOT NULL,
    company_name    VARCHAR(150) NOT NULL,
    legal_name      VARCHAR(150) NULL,
    company_type    VARCHAR(30)  NULL,
    gst_no          VARCHAR(15)  NULL,
    pan_no          VARCHAR(10)  NULL,
    phone           VARCHAR(20)  NOT NULL,
    alternate_phone VARCHAR(20)  NULL,
    email           VARCHAR(100) NULL,
    website         VARCHAR(150) NULL,
    address_line1   VARCHAR(200) NULL,
    address_line2   VARCHAR(200) NULL,
    city            VARCHAR(50)  NULL,
    state           VARCHAR(50)  NOT NULL,
    state_code      VARCHAR(5)   NULL,
    pincode         VARCHAR(10)  NULL,
    country         VARCHAR(50)  NOT NULL DEFAULT 'India',
    currency        VARCHAR(10)  NOT NULL DEFAULT 'INR',
    logo_url        VARCHAR(255) NULL,
    is_default      BOOLEAN      NOT NULL DEFAULT FALSE,
    status          VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_companies_code UNIQUE (company_code),
    CONSTRAINT uk_companies_gst_no UNIQUE (gst_no),
    CONSTRAINT chk_companies_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_company_status ON companies (status);
CREATE INDEX idx_company_gst_no ON companies (gst_no);
-- =====================================================================================
-- Silvee925 ERP - Phase 2 schema: Unit, Currency, Tax, Warehouse, Bank, Financial Year masters
-- =====================================================================================

CREATE TABLE units (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    abbreviation    VARCHAR(10) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6) NOT NULL,
    updated_at      DATETIME(6) NOT NULL,
    version         BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT uk_units_name UNIQUE (name),
    CONSTRAINT uk_units_abbreviation UNIQUE (abbreviation),
    CONSTRAINT chk_units_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_unit_status ON units (status);

CREATE TABLE currencies (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    code            VARCHAR(10) NOT NULL,
    name            VARCHAR(50) NOT NULL,
    symbol          VARCHAR(5)  NOT NULL,
    decimal_places  INT         NOT NULL DEFAULT 2,
    is_default      BOOLEAN     NOT NULL DEFAULT FALSE,
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6) NOT NULL,
    updated_at      DATETIME(6) NOT NULL,
    version         BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT uk_currencies_code UNIQUE (code),
    CONSTRAINT chk_currencies_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_currency_status ON currencies (status);

CREATE TABLE taxes (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50)   NOT NULL,
    code            VARCHAR(20)   NOT NULL,
    rate_percentage DECIMAL(5,2)  NOT NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)   NOT NULL,
    updated_at      DATETIME(6)   NOT NULL,
    version         BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT uk_taxes_code UNIQUE (code),
    CONSTRAINT chk_taxes_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT chk_taxes_rate CHECK (rate_percentage >= 0 AND rate_percentage <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_tax_status ON taxes (status);

CREATE TABLE warehouses (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    warehouse_code  VARCHAR(20)  NOT NULL,
    name            VARCHAR(100) NOT NULL,
    location        VARCHAR(200) NULL,
    capacity        INT          NULL,
    is_default      BOOLEAN      NOT NULL DEFAULT FALSE,
    status          VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)  NOT NULL,
    updated_at      DATETIME(6)  NOT NULL,
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_warehouses_code UNIQUE (warehouse_code),
    CONSTRAINT chk_warehouses_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_warehouse_status ON warehouses (status);

CREATE TABLE banks (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    bank_name           VARCHAR(100) NOT NULL,
    branch              VARCHAR(100) NOT NULL,
    account_holder_name VARCHAR(100) NOT NULL,
    account_no          VARCHAR(30)  NOT NULL,
    ifsc_code           VARCHAR(11)  NOT NULL,
    status              VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at          DATETIME(6)  NOT NULL,
    updated_at          DATETIME(6)  NOT NULL,
    version             BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_banks_account_no UNIQUE (account_no),
    CONSTRAINT chk_banks_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_bank_status ON banks (status);

CREATE TABLE financial_years (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(20) NOT NULL,
    start_date      DATE        NOT NULL,
    end_date        DATE        NOT NULL,
    is_active       BOOLEAN     NOT NULL DEFAULT FALSE,
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6) NOT NULL,
    updated_at      DATETIME(6) NOT NULL,
    version         BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT uk_financial_years_name UNIQUE (name),
    CONSTRAINT chk_financial_years_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT chk_financial_years_dates CHECK (end_date > start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_financial_year_status ON financial_years (status);
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
-- =====================================================================================
-- Silvee925 ERP - Phase 4 schema: Customer, Supplier, Salesman, Ledger masters
-- =====================================================================================

CREATE TABLE customers (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_code   VARCHAR(20)   NOT NULL,
    name            VARCHAR(150)  NOT NULL,
    phone           VARCHAR(20)   NOT NULL,
    email           VARCHAR(100)  NULL,
    gst_no          VARCHAR(15)   NULL,
    address_line1   VARCHAR(200)  NULL,
    city            VARCHAR(50)   NULL,
    state           VARCHAR(50)   NULL,
    pincode         VARCHAR(10)   NULL,
    credit_limit    DECIMAL(12,2) NULL,
    opening_balance DECIMAL(12,2) NOT NULL DEFAULT 0,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)   NOT NULL,
    updated_at      DATETIME(6)   NOT NULL,
    version         BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT uk_customers_code UNIQUE (customer_code),
    CONSTRAINT chk_customers_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_customer_status ON customers (status);

CREATE TABLE suppliers (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    supplier_code   VARCHAR(20)   NOT NULL,
    name            VARCHAR(150)  NOT NULL,
    phone           VARCHAR(20)   NOT NULL,
    email           VARCHAR(100)  NULL,
    gst_no          VARCHAR(15)   NULL,
    address_line1   VARCHAR(200)  NULL,
    city            VARCHAR(50)   NULL,
    state           VARCHAR(50)   NULL,
    pincode         VARCHAR(10)   NULL,
    opening_balance DECIMAL(12,2) NOT NULL DEFAULT 0,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)   NOT NULL,
    updated_at      DATETIME(6)   NOT NULL,
    version         BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT uk_suppliers_code UNIQUE (supplier_code),
    CONSTRAINT chk_suppliers_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_supplier_status ON suppliers (status);

CREATE TABLE salesmen (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    salesman_code   VARCHAR(20)   NOT NULL,
    name            VARCHAR(100)  NOT NULL,
    phone           VARCHAR(20)   NOT NULL,
    email           VARCHAR(100)  NULL,
    territory       VARCHAR(100)  NULL,
    monthly_target  DECIMAL(12,2) NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME(6)   NOT NULL,
    updated_at      DATETIME(6)   NOT NULL,
    version         BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT uk_salesmen_code UNIQUE (salesman_code),
    CONSTRAINT chk_salesmen_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_salesman_status ON salesmen (status);

CREATE TABLE ledgers (
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    ledger_code           VARCHAR(20)   NOT NULL,
    name                  VARCHAR(100)  NOT NULL,
    ledger_type           VARCHAR(30)   NOT NULL,
    opening_balance       DECIMAL(12,2) NOT NULL DEFAULT 0,
    opening_balance_type  VARCHAR(10)   NOT NULL DEFAULT 'DEBIT',
    status                VARCHAR(20)   NOT NULL DEFAULT 'ACTIVE',
    created_at            DATETIME(6)   NOT NULL,
    updated_at            DATETIME(6)   NOT NULL,
    version               BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT uk_ledgers_code UNIQUE (ledger_code),
    CONSTRAINT uk_ledgers_name UNIQUE (name),
    CONSTRAINT chk_ledgers_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT chk_ledgers_balance_type CHECK (opening_balance_type IN ('DEBIT', 'CREDIT'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_ledger_status ON ledgers (status);
