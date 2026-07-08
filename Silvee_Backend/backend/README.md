# Silvee925 ERP - Backend

Production Spring Boot backend for the Silvee925 sterling silver jewellery ERP system. Built module-by-module against the [existing React frontend](../src); this backend is developed incrementally and this README reflects **Phase 1 + Phase 2 + Phase 3 + Phase 4** of that build-out.

## Phase 1 scope

- Project skeleton: Maven, Spring Boot 3.3.4, Java 17, layered package structure
- Database design + Flyway-managed schema for: `users`, `refresh_tokens`, `permissions`, `user_permissions`, `employees`, `companies`
- Authentication: bootstrap ADMIN registration, login, JWT access tokens, rotating opaque refresh tokens, BCrypt password hashing, role-based authorization (`ADMIN`, `SALES`)
- ADMIN-only employee/permission management (ADMIN creates SALES accounts and assigns granular module permissions)
- Company Master: full CRUD with pagination, sorting, search, and default-company handling
- Cross-cutting: uniform `ApiResponse` envelope, centralized exception handling, SLF4J logging, Swagger/OpenAPI

## Phase 2 scope (this delivery)

Six standalone master modules, each with full CRUD, pagination/sorting/search, and validation:

- **Unit Master** - measurement units (name + abbreviation, both unique)
- **Currency Master** - ISO 4217 currencies with a single enforced default currency
- **Tax Master** - GST rate schemes; CGST/SGST/IGST are derived from the stored combined rate (never stored redundantly)
- **Warehouse Master** - stock locations with a single enforced default warehouse
- **Bank Master** - company bank accounts with IFSC format validation
- **Financial Year Master** - periods with a single enforced active year, date-range validation (end after start), and overlap rejection against existing years

## Phase 3 scope (this delivery)

Hierarchical catalog masters:

- **Category Master** - top-level item categories
- **Sub Category Master** - scoped to a parent category (name uniqueness is per-category, not global); deletion is blocked while items reference it
- **Item Master** - catalog data only (code, name, category/sub-category/unit references, HSN code, purchase/selling price). Running stock is deliberately **not** stored here — it belongs to the Inventory module's stock ledger, and duplicating it on the Item row would create a second, driftable source of truth. Cross-field validation rejects an item whose sub-category doesn't actually belong to its category.

## Phase 4 scope (this delivery)

Party and accounting masters:

- **Customer Master** - includes credit limit and opening receivable balance
- **Supplier Master** - includes opening payable balance
- **Salesman Master** - standalone (matches the frontend's separate Salesman Master vs. Salesman performance pages); not coupled to Employee/User
- **Employee Master** - standalone full CRUD (`/api/masters/employees`), distinct from `POST /api/users/employees` (which creates an Employee row *and* a linked SALES login in one step, for the ADMIN-onboards-staff flow from Phase 1). Deletion is blocked while a user account is linked, with a `hasUserAccount` flag surfaced in every response so the UI can show why.
- **Ledger Master** - chart-of-accounts entries with an accounting group (`ledgerType`), opening balance, and opening balance side (debit/credit); code and name are both independently unique

Later phases will add Inventory, Sales/Purchase, Accounts (transactional ledger/vouchers), GST, Reports, and Settings, following the same architecture established here.

## Tech stack

| Concern | Choice |
|---|---|
| Language / runtime | Java 17 |
| Framework | Spring Boot 3.3.4 |
| Build tool | Maven |
| Database | MySQL 8 |
| Schema migrations | Flyway |
| Security | Spring Security + JJWT (JWT) + BCrypt |
| API docs | springdoc-openapi (Swagger UI) |
| Mapping | MapStruct |
| Boilerplate | Lombok |

## Role model

Only two roles can authenticate:

- **ADMIN** — full access to every endpoint. Creates and manages employee/SALES accounts and their permissions.
- **SALES** — created exclusively by an ADMIN (`POST /api/users/employees`), scoped down to whichever `(module, action)` permissions the ADMIN grants. Employees are business records (Employee Master) linked 1:1 to their login account; they are not a separate system role.

## Getting started

### Prerequisites

- JDK 17+
- Maven 3.9+
- MySQL 8+ (a local instance, Docker container, or managed instance)

### 1. Create the database

```sql
CREATE DATABASE silvee925_erp CHARACTER SET utf8mb4;
```

Flyway creates all tables automatically on first startup — no manual schema step needed. `database/schema.sql` is provided as a static reference copy of the same migration, and `database/sample-data.sql` seeds two demo companies (run it after the app's first startup).

### 2. Configure environment variables

All configuration has sane local defaults (see `src/main/resources/application.yml`), but for anything beyond local development set:

| Variable | Purpose | Default |
|---|---|---|
| `DB_HOST`, `DB_PORT`, `DB_NAME` | MySQL connection | `localhost`, `3306`, `silvee925_erp` |
| `DB_USERNAME`, `DB_PASSWORD` | MySQL credentials | `root` / `root` |
| `JWT_SECRET` | HMAC signing key (256-bit+, base64) — **must** be overridden in production | dev-only placeholder |
| `JWT_ACCESS_EXPIRATION_MS` | Access token lifetime | `900000` (15 min) |
| `JWT_REFRESH_EXPIRATION_MS` | Refresh token lifetime | `604800000` (7 days) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins | `http://localhost:5173` |

### 3. Run

```bash
cd backend
mvn spring-boot:run
```

The API is served at `http://localhost:8080`. Swagger UI: `http://localhost:8080/swagger-ui.html`. Health check: `http://localhost:8080/actuator/health`.

### 4. Bootstrap the first ADMIN

There is no seeded default admin (avoids a well-known default credential in source control). Create the first account yourself:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"fullName":"Super Admin","email":"admin@silvee925.com","password":"Admin@12345"}'
```

This endpoint only succeeds once — it rejects the request if an ADMIN already exists. From then on, that ADMIN creates every other account via `POST /api/users/employees`.

### 5. Build / test

```bash
mvn clean verify   # compiles, runs tests
mvn clean package  # produces target/silvee925-erp-backend.jar
```

## API summary (Phase 1 + 2 + 3 + 4)

All responses are wrapped in a consistent envelope:

```json
{ "success": true, "message": "...", "data": { }, "timestamp": "..." }
{ "success": false, "message": "...", "errors": ["..."], "timestamp": "..." }
```

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Bootstrap the first ADMIN account (fails if one exists) |
| POST | `/api/auth/login` | Public | Login, returns access + refresh token |
| POST | `/api/auth/refresh-token` | Public | Rotate a refresh token for a new token pair |
| POST | `/api/auth/logout` | Public | Revoke a refresh token |
| POST | `/api/users/employees` | ADMIN | Create an Employee Master record + linked SALES login |
| PUT | `/api/users/{id}/permissions` | ADMIN | Replace a SALES user's granted permissions |
| GET | `/api/users` | ADMIN | List all user accounts |
| GET | `/api/users/{id}` | ADMIN | Get one user account |
| PUT | `/api/users/{id}/activate` \| `/deactivate` | ADMIN | Toggle account access |
| POST | `/api/masters/companies` | ADMIN | Create a company |
| PUT | `/api/masters/companies/{id}` | ADMIN | Update a company |
| GET | `/api/masters/companies/{id}` | Authenticated | Get one company |
| GET | `/api/masters/companies?query=&status=&page=&size=&sort=` | Authenticated | Paginated/sortable/filterable search |
| PUT | `/api/masters/companies/{id}/set-default` | ADMIN | Switch the default company |
| DELETE | `/api/masters/companies/{id}` | ADMIN | Delete a company (blocked if it's the default and others exist) |
| POST/PUT/GET/DELETE | `/api/masters/units[/{id}]` | ADMIN write, Authenticated read | Unit Master CRUD |
| POST/PUT/GET/DELETE | `/api/masters/currencies[/{id}]` | ADMIN write, Authenticated read | Currency Master CRUD |
| PUT | `/api/masters/currencies/{id}/set-default` | ADMIN | Switch the default currency |
| POST/PUT/GET/DELETE | `/api/masters/taxes[/{id}]` | ADMIN write, Authenticated read | Tax Master CRUD (CGST/SGST/IGST derived in the response) |
| POST/PUT/GET/DELETE | `/api/masters/warehouses[/{id}]` | ADMIN write, Authenticated read | Warehouse Master CRUD |
| PUT | `/api/masters/warehouses/{id}/set-default` | ADMIN | Switch the default warehouse |
| POST/PUT/GET/DELETE | `/api/masters/banks[/{id}]` | ADMIN write, Authenticated read | Bank Master CRUD |
| POST/PUT/GET/DELETE | `/api/masters/financial-years[/{id}]` | ADMIN write, Authenticated read | Financial Year Master CRUD (overlap-checked) |
| PUT | `/api/masters/financial-years/{id}/set-active` | ADMIN | Switch the active financial year |
| POST/PUT/GET/DELETE | `/api/masters/categories[/{id}]` | ADMIN write, Authenticated read | Category Master CRUD (blocked if sub-categories/items reference it) |
| POST/PUT/GET/DELETE | `/api/masters/sub-categories[/{id}]` | ADMIN write, Authenticated read | Sub Category Master CRUD, scoped to `categoryId` (also filterable in search) |
| POST/PUT/GET/DELETE | `/api/masters/items[/{id}]` | ADMIN write, Authenticated read | Item Master CRUD, filterable by `categoryId` |
| POST/PUT/GET/DELETE | `/api/masters/customers[/{id}]` | ADMIN write, Authenticated read | Customer Master CRUD |
| POST/PUT/GET/DELETE | `/api/masters/suppliers[/{id}]` | ADMIN write, Authenticated read | Supplier Master CRUD |
| POST/PUT/GET/DELETE | `/api/masters/salesmen[/{id}]` | ADMIN write, Authenticated read | Salesman Master CRUD |
| POST/PUT/GET/DELETE | `/api/masters/ledgers[/{id}]` | ADMIN write, Authenticated read | Ledger Master CRUD (code and name both unique) |
| POST/PUT/GET/DELETE | `/api/masters/employees[/{id}]` | ADMIN | Employee Master CRUD (blocked if a user account is linked; distinct from `/api/users/employees`) |

All master list endpoints accept `?query=&status=&page=&size=&sort=` for search, filtering, and pagination (Sub Category and Item also accept `&categoryId=`).

Full request/response schemas and validation rules are in Swagger UI, and a ready-to-import collection is at `postman/Silvee925-ERP.postman_collection.json` (set `baseUrl` if not running on `localhost:8080`; the Auth requests auto-populate `accessToken`/`refreshToken` collection variables via test scripts).

## Design notes and assumptions

The frontend (`../src/pages/*Master.jsx`) is currently a static UI mockup: master pages render hardcoded arrays through a shared `MasterPageTemplate` with no wired-up forms, and there is no login screen or API client anywhere in the codebase. Given that, this backend was designed from ERP domain requirements rather than reverse-engineered from a live contract, using the frontend's table columns as a baseline and extending fields where a production master genuinely needs more (e.g. Company Master gains full address/GST/PAN fields matching the richer detail form in `Masters.jsx`).

- **Roles**: per explicit product decision, only `ADMIN` and `SALES` can authenticate. The Settings page's mock "Manager/Accountant/Super Admin" labels are treated as descriptive `designation` text on the Employee Master, not system roles.
- **Refresh tokens** are opaque, server-stored, single-use (rotated on every refresh) and revocable — not JWTs themselves — so a compromised refresh token can be invalidated without waiting out its expiry.
- **Default/active singletons**: the same "exactly one at a time" pattern used for Company Master is reused for Currency (default currency), Warehouse (default warehouse), and Financial Year (active year) — the first record created is forced into that role, switching it elsewhere is atomic, and deleting/unsetting the current one directly is blocked while alternatives exist.
- **Tax Master stores only the combined GST rate**: CGST/SGST/IGST are always a clean 50/50 split of the total rate under Indian GST rules, so storing them separately would just be redundant, driftable data. They're derived in `TaxMapper` at read time instead.
- **Item Master excludes stock quantity**: current stock is a derived, constantly-moving fact that belongs to the Inventory module's stock ledger, not the catalog record — storing it on the Item row would let the two drift apart the moment a sale or purchase posts without updating both.
- **Sub-category name uniqueness is scoped to its parent category**, not global, since e.g. "Gold" sub-categories under both "Rings" and "Chains" are legitimate and shouldn't collide.
- **Schema ownership**: Hibernate `ddl-auto` is set to `validate`, never `update`/`create` — Flyway migrations are the single source of truth for schema, which is the only safe pattern for a production database.
- **Lazy-association reads are transactional**: every service method whose response DTO touches a `@ManyToOne` (Item→Category/SubCategory/Unit, SubCategory→Category, User→Employee) is `@Transactional(readOnly = true)`, so the Hibernate session stays open through mapping. `open-in-view` is disabled (a widely-recommended production setting to avoid accidental lazy loading in the view layer), which means skipping this on any future module will surface immediately as a `LazyInitializationException` rather than silently working by accident.
- **Employee Master vs. `/api/users/employees`**: the former is a plain HR record CRUD; the latter (from Phase 1) creates an Employee row *and* a linked SALES login together, since that's how an ADMIN actually onboards staff who need system access. Employee Master exposes a derived `hasUserAccount` flag and blocks deletion while a user is linked, rather than silently orphaning the login or cascading a user deletion from a masters screen.
- **Salesman Master is standalone**, not FK'd to Employee, mirroring the frontend's separate "Salesman Master" and "Salesman" (performance) pages — a salesman code is a business identity, not necessarily a system login.
- **Ledger Master enforces uniqueness on both code and name independently** (not a composite key), since accounting convention treats a duplicate ledger name as an error even if a different code is used.

## Database design (Phase 1 + 2 + 3 + 4)

```
employees ──< users >── refresh_tokens
                │
                └──< user_permissions >── permissions

companies, units, currencies, taxes, warehouses, banks, financial_years
  (all standalone; no FK dependents yet — future Sales/Purchase/Inventory
   modules will reference these by id for multi-company/multi-warehouse scoping)

categories ──< sub_categories ──< items >── units
     └──────────────────────────────< items
```

| Table | Purpose | Key indexes |
|---|---|---|
| `employees` | Employee Master; source of truth for staff, independent of login access | unique `employee_code`, `email`; index on `status`, `phone` |
| `users` | Login principals (`ADMIN`/`SALES`), optionally linked to an employee | unique `email`; index on `role` |
| `refresh_tokens` | Rotated, revocable refresh tokens | unique `token`; index on `user_id`, `(expiry_date, revoked)` |
| `permissions` | Fixed `(module, action)` catalog, seeded at boot | unique `(module, action)` |
| `user_permissions` | Grants of specific permissions to SALES users | unique `(user_id, permission_id)`; index on `user_id` |
| `companies` | Company Master | unique `company_code`, `gst_no`; index on `status` |
| `units` | Unit Master | unique `name`, `abbreviation`; index on `status` |
| `currencies` | Currency Master | unique `code`; index on `status` |
| `taxes` | Tax Master | unique `code`; index on `status` |
| `warehouses` | Warehouse Master | unique `warehouse_code`; index on `status` |
| `banks` | Bank Master | unique `account_no`; index on `status` |
| `financial_years` | Financial Year Master | unique `name`; index on `status`; DB-level check that `end_date > start_date` |
| `categories` | Category Master | unique `name`; index on `status` |
| `sub_categories` | Sub Category Master, FK to `categories` (`ON DELETE RESTRICT`) | unique `(category_id, name)`; index on `status` |
| `items` | Item Master, FK to `categories`/`sub_categories`/`units` (`ON DELETE RESTRICT`) | unique `item_code`; index on `status`, `category_id`, `sub_category_id`, `unit_id` |
| `customers` | Customer Master | unique `customer_code`; index on `status` |
| `suppliers` | Supplier Master | unique `supplier_code`; index on `status` |
| `salesmen` | Salesman Master | unique `salesman_code`; index on `status` |
| `ledgers` | Ledger Master | unique `ledger_code`, `name`; index on `status` |

See `database/schema.sql` for full DDL and the Flyway migrations under `src/main/resources/db/migration/` (`V1__init_auth_and_company_schema.sql`, `V2__phase2_simple_masters.sql`, `V3__category_subcategory_item_masters.sql`, `V4__customer_supplier_salesman_ledger_masters.sql`) for the authoritative, version-controlled schema history.
