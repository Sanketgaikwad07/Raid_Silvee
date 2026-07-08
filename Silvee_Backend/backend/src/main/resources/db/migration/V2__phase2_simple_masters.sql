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
