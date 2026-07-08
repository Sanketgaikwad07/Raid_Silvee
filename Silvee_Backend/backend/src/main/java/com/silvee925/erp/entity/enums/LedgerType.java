package com.silvee925.erp.entity.enums;

/** Accounting group a ledger belongs to; drives which reports/statements it feeds. */
public enum LedgerType {
    SALES,
    PURCHASE,
    INCOME,
    EXPENSE,
    ASSET,
    LIABILITY,
    CAPITAL,
    BANK,
    CASH,
    SUNDRY_DEBTORS,
    SUNDRY_CREDITORS
}
