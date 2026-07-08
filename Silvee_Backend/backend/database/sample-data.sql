-- =====================================================================================
-- Sample test data - Phase 1 (Company Master) + Phase 2 (simple standalone masters)
-- Run AFTER the application has started at least once (so Flyway has created the schema
-- and the permission catalog has been seeded by DataInitializer).
--
-- User/employee accounts are intentionally NOT seeded here: passwords must go through
-- BCryptPasswordEncoder, and hardcoding a bcrypt hash in a checked-in SQL file is a poor
-- security practice. Instead, create accounts through the API:
--   1. POST /api/auth/register           -> creates the first ADMIN
--   2. POST /api/users/employees (as ADMIN) -> creates SALES/employee accounts
-- =====================================================================================

INSERT INTO companies (
    company_code, company_name, legal_name, company_type, gst_no, pan_no,
    phone, alternate_phone, email, website,
    address_line1, address_line2, city, state, state_code, pincode, country, currency,
    is_default, status, created_at, updated_at, version
) VALUES
(
    'SILVEE925', 'Silvee925 Jewels Pvt. Ltd.', 'Silvee925 Jewels Private Limited', 'Private Limited',
    '27ABCDE1234F1Z5', 'ABCDE1234F',
    '+91 88888 92525', '+91 77770 92525', 'info@silvee925.com', 'www.silvee925.com',
    '3A, 3B, 2nd Floor, SB Road', 'Above Dominos Pizza', 'Pune', 'Maharashtra', '27', '411016', 'India', 'INR',
    TRUE, 'ACTIVE', NOW(6), NOW(6), 0
),
(
    'SILVEE925-2', 'Silvee925 Exports Pvt. Ltd.', 'Silvee925 Exports Private Limited', 'Private Limited',
    '27ABCDE5678G1Z6', 'ABCDE5678G',
    '+91 77770 92525', NULL, 'exports@silvee925.com', 'www.silvee925.com',
    '3A, 3B, 2nd Floor, SB Road', NULL, 'Pune', 'Maharashtra', '27', '411016', 'India', 'INR',
    FALSE, 'ACTIVE', NOW(6), NOW(6), 0
);

INSERT INTO units (name, abbreviation, status, created_at, updated_at, version) VALUES
('Gram', 'gm', 'ACTIVE', NOW(6), NOW(6), 0),
('Piece', 'pcs', 'ACTIVE', NOW(6), NOW(6), 0),
('Set', 'set', 'INACTIVE', NOW(6), NOW(6), 0);

INSERT INTO currencies (code, name, symbol, decimal_places, is_default, status, created_at, updated_at, version) VALUES
('INR', 'Indian Rupee', '₹', 2, TRUE, 'ACTIVE', NOW(6), NOW(6), 0),
('USD', 'US Dollar', '$', 2, FALSE, 'INACTIVE', NOW(6), NOW(6), 0);

INSERT INTO taxes (name, code, rate_percentage, status, created_at, updated_at, version) VALUES
('GST 18%', 'GST18', 18.00, 'ACTIVE', NOW(6), NOW(6), 0),
('GST 5%', 'GST5', 5.00, 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO warehouses (warehouse_code, name, location, capacity, is_default, status, created_at, updated_at, version) VALUES
('WH-01', 'Main Warehouse', 'Pune', 1200, TRUE, 'ACTIVE', NOW(6), NOW(6), 0),
('WH-02', 'Export Warehouse', 'Mumbai', 800, FALSE, 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO banks (bank_name, branch, account_holder_name, account_no, ifsc_code, status, created_at, updated_at, version) VALUES
('State Bank of India', 'Pune', 'Silvee925 Jewels Pvt. Ltd.', '1234567890', 'SBIN0001234', 'ACTIVE', NOW(6), NOW(6), 0),
('HDFC Bank', 'Mumbai', 'Silvee925 Jewels Pvt. Ltd.', '0987654321', 'HDFC0001234', 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO financial_years (name, start_date, end_date, is_active, status, created_at, updated_at, version) VALUES
('FY 2023-24', '2023-04-01', '2024-03-31', FALSE, 'INACTIVE', NOW(6), NOW(6), 0),
('FY 2024-25', '2024-04-01', '2025-03-31', TRUE, 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO categories (name, type, status, created_at, updated_at, version) VALUES
('Rings', 'Product', 'ACTIVE', NOW(6), NOW(6), 0),
('Pendants', 'Product', 'ACTIVE', NOW(6), NOW(6), 0),
('Chains', 'Product', 'ACTIVE', NOW(6), NOW(6), 0);

-- Subqueries resolve category_id by name so insert order never has to match auto-increment ids.
INSERT INTO sub_categories (name, category_id, description, status, created_at, updated_at, version) VALUES
('Rings - Gold', (SELECT id FROM categories WHERE name = 'Rings'), 'Gold rings collection', 'ACTIVE', NOW(6), NOW(6), 0),
('Pendants - Stones', (SELECT id FROM categories WHERE name = 'Pendants'), 'Stone pendants', 'ACTIVE', NOW(6), NOW(6), 0),
('Chains - Silver', (SELECT id FROM categories WHERE name = 'Chains'), 'Silver chains', 'INACTIVE', NOW(6), NOW(6), 0);

INSERT INTO items (item_code, name, category_id, sub_category_id, unit_id, hsn_code, purchase_price, selling_price, status, created_at, updated_at, version) VALUES
('ITM-001', 'CZ Ring (Premium)', (SELECT id FROM categories WHERE name = 'Rings'), (SELECT id FROM sub_categories WHERE name = 'Rings - Gold'), (SELECT id FROM units WHERE name = 'Piece'), '71131900', 2000.00, 2450.00, 'ACTIVE', NOW(6), NOW(6), 0),
('ITM-002', 'Silver Chain (22 inch)', (SELECT id FROM categories WHERE name = 'Chains'), (SELECT id FROM sub_categories WHERE name = 'Chains - Silver'), (SELECT id FROM units WHERE name = 'Piece'), '71131100', 950.00, 1280.00, 'ACTIVE', NOW(6), NOW(6), 0),
('ITM-003', 'Heart Pendant', (SELECT id FROM categories WHERE name = 'Pendants'), (SELECT id FROM sub_categories WHERE name = 'Pendants - Stones'), (SELECT id FROM units WHERE name = 'Piece'), '71131900', 1050.00, 1450.00, 'INACTIVE', NOW(6), NOW(6), 0);

INSERT INTO customers (customer_code, name, phone, email, gst_no, city, state, pincode, credit_limit, opening_balance, status, created_at, updated_at, version) VALUES
('CUST-001', 'Shree Jewellers', '+91 98765 43210', 'shree@example.com', '27ABCDE1234F1Z5', 'Pune', 'Maharashtra', '411001', 50000.00, 0.00, 'ACTIVE', NOW(6), NOW(6), 0),
('CUST-002', 'Mahalaxmi Ornaments', '+91 91234 56789', 'mahalaxmi@example.com', NULL, 'Mumbai', 'Maharashtra', '400001', 30000.00, 0.00, 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO suppliers (supplier_code, name, phone, email, city, state, opening_balance, status, created_at, updated_at, version) VALUES
('SUP-001', 'Shree Silver Suppliers', '+91 98888 12345', 'shree.supplier@example.com', 'Pune', 'Maharashtra', 0.00, 'ACTIVE', NOW(6), NOW(6), 0),
('SUP-002', 'Om Silver World', '+91 97777 12345', 'om.supplier@example.com', 'Mumbai', 'Maharashtra', 0.00, 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO salesmen (salesman_code, name, phone, email, territory, monthly_target, status, created_at, updated_at, version) VALUES
('SM-001', 'Mahesh Patil', '+91 98765 43210', 'mahesh@example.com', 'Pune West', 300000.00, 'ACTIVE', NOW(6), NOW(6), 0),
('SM-002', 'Rahul Kumar', '+91 98765 43211', 'rahul@example.com', 'Mumbai', 300000.00, 'ACTIVE', NOW(6), NOW(6), 0);

INSERT INTO ledgers (ledger_code, name, ledger_type, opening_balance, opening_balance_type, status, created_at, updated_at, version) VALUES
('LG-SALES', 'Sales Ledger', 'SALES', 0.00, 'CREDIT', 'ACTIVE', NOW(6), NOW(6), 0),
('LG-PURCHASE', 'Purchase Ledger', 'PURCHASE', 0.00, 'DEBIT', 'ACTIVE', NOW(6), NOW(6), 0),
('LG-CASH', 'Cash Ledger', 'CASH', 125400.00, 'DEBIT', 'ACTIVE', NOW(6), NOW(6), 0);

-- Employee Master rows carry no credentials, so (unlike users) they're safe to seed directly.
-- Staff who also need a login are created via POST /api/users/employees instead.
INSERT INTO employees (employee_code, full_name, designation, phone, email, status, created_at, updated_at, version) VALUES
('EMP-001', 'Priya Deshmukh', 'Accountant', '+91 88888 22222', 'priya@silvee925.com', 'ACTIVE', NOW(6), NOW(6), 0);
