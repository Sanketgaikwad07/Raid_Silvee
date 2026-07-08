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
