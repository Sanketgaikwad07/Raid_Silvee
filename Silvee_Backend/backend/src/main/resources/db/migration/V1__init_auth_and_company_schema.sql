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
