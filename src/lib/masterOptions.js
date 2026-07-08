export const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
];

export const LEDGER_TYPE_OPTIONS = [
  'SALES', 'PURCHASE', 'INCOME', 'EXPENSE', 'ASSET', 'LIABILITY',
  'CAPITAL', 'BANK', 'CASH', 'SUNDRY_DEBTORS', 'SUNDRY_CREDITORS',
].map((v) => ({ value: v, label: v.replace(/_/g, ' ') }));

export const BALANCE_TYPE_OPTIONS = [
  { value: 'DEBIT', label: 'Debit' },
  { value: 'CREDIT', label: 'Credit' },
];

export const PERMISSION_MODULE_OPTIONS = [
  'COMPANY_MASTER', 'EMPLOYEE_MASTER', 'CUSTOMER_MASTER', 'SUPPLIER_MASTER',
  'CATEGORY_MASTER', 'SUB_CATEGORY_MASTER', 'ITEM_MASTER', 'UNIT_MASTER',
  'CURRENCY_MASTER', 'TAX_MASTER', 'WAREHOUSE_MASTER', 'BANK_MASTER',
  'FINANCIAL_YEAR_MASTER', 'SALESMAN_MASTER', 'LEDGER_MASTER',
  'SALES_INVOICE', 'PURCHASE_ORDER', 'INVENTORY', 'ACCOUNTS_LEDGER',
];

export const PERMISSION_ACTION_OPTIONS = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

export function formatDateTime(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('en-IN');
}

export function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-IN');
}
