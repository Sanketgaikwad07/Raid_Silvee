package com.silvee925.erp.entity.enums;

/**
 * Feature modules that a SALES user's granular permissions can be scoped to.
 * ADMIN implicitly bypasses this matrix and has full access everywhere.
 * New master/transaction modules are appended here as they are built.
 */
public enum PermissionModule {
    COMPANY_MASTER,
    EMPLOYEE_MASTER,
    CUSTOMER_MASTER,
    SUPPLIER_MASTER,
    CATEGORY_MASTER,
    SUB_CATEGORY_MASTER,
    ITEM_MASTER,
    UNIT_MASTER,
    CURRENCY_MASTER,
    TAX_MASTER,
    WAREHOUSE_MASTER,
    BANK_MASTER,
    FINANCIAL_YEAR_MASTER,
    SALESMAN_MASTER,
    LEDGER_MASTER,
    SALES_INVOICE,
    PURCHASE_ORDER,
    INVENTORY,
    ACCOUNTS_LEDGER
}
