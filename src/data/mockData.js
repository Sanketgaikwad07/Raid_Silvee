// Sales overview data for last 7 days chart
export const salesOverviewData = [
  { date: '11 May', sales: 180000, grossProfit: 45000 },
  { date: '12 May', sales: 220000, grossProfit: 62000 },
  { date: '13 May', sales: 195000, grossProfit: 55000 },
  { date: '14 May', sales: 250000, grossProfit: 72000 },
  { date: '15 May', sales: 210000, grossProfit: 58000 },
  { date: '16 May', sales: 240000, grossProfit: 68000 },
  { date: '17 May', sales: 230000, grossProfit: 65000 },
];

// Sales by category donut chart
export const salesByCategoryData = [
  { name: 'Rings', value: 35.6, color: '#3b82f6' },
  { name: 'Pendants', value: 24.6, color: '#22c55e' },
  { name: 'Chains', value: 18.7, color: '#f59e0b' },
  { name: 'Earrings', value: 12.2, color: '#8b5cf6' },
  { name: 'Others', value: 8.9, color: '#6b7280' },
];

// KPI stats cards
export const statsData = [
  { id: 1, title: "Today's Sales", value: '₹ 12,45,800', change: 18.6, isPositive: true, vsText: 'vs Yesterday ₹ 10,51,200', color: '#3b82f6', bgColor: '#eff6ff' },
  { id: 2, title: "Today's Purchase", value: '₹ 8,76,500', change: 22.4, isPositive: true, vsText: 'vs Yesterday ₹ 7,15,400', color: '#8b5cf6', bgColor: '#f5f3ff' },
  { id: 3, title: 'Gross Profit', value: '₹ 3,45,230', change: 16.8, isPositive: true, vsText: 'vs Yesterday ₹ 2,95,620', color: '#22c55e', bgColor: '#f0fdf4' },
  { id: 4, title: 'Total Collections', value: '₹ 9,15,200', change: 14.3, isPositive: true, vsText: 'vs Yesterday ₹ 7,99,500', color: '#f59e0b', bgColor: '#fffbeb' },
  { id: 5, title: 'Total Outstanding', value: '₹ 1,48,310', change: 5.2, isPositive: false, vsText: 'vs Yesterday ₹ 1,56,430', color: '#ef4444', bgColor: '#fef2f2' },
  { id: 6, title: 'Inventory Value', value: '₹ 2,74,52,600', change: 9.8, isPositive: true, vsText: 'vs Yesterday ₹ 2,49,98,400', color: '#06b6d4', bgColor: '#ecfeff' },
];

// Top 5 items by sales
export const topItemsData = [
  { name: 'CZ Ring (Premium)', weight: '2,450 gm', sales: '₹ 2,45,600' },
  { name: 'Silver Chain (22 inch)', weight: '1,980 gm', sales: '₹ 1,98,450' },
  { name: 'Heart Pendant', weight: '1,350 gm', sales: '₹ 1,45,230' },
  { name: 'Bali Earrings', weight: '1,120 gm', sales: '₹ 1,20,450' },
  { name: 'Casting Ring', weight: '980 gm', sales: '₹ 98,760' },
];

// Top 5 customers
export const topCustomersData = [
  { name: 'Shree Jewellers', sales: '₹ 2,35,600', outstanding: '₹ 28,450' },
  { name: 'Mahalaxmi Ornaments', sales: '₹ 1,85,350', outstanding: '₹ 22,300' },
  { name: 'Sai Jewellers', sales: '₹ 1,45,600', outstanding: '₹ 18,900' },
  { name: 'Riddhi Siddhi Jewellers', sales: '₹ 1,20,450', outstanding: '₹ 15,600' },
  { name: 'Pooja Jewellers', sales: '₹ 98,750', outstanding: '₹ 12,450' },
];

// Top 5 suppliers
export const topSuppliersData = [
  { name: 'Shree Silver Suppliers', purchase: '₹ 3,45,600', outstanding: '₹ 45,230' },
  { name: 'Om Silver World', purchase: '₹ 2,15,400', outstanding: '₹ 32,450' },
  { name: 'Balaji Silver Pvt. Ltd.', purchase: '₹ 1,85,600', outstanding: '₹ 28,760' },
  { name: 'Silver Star Suppliers', purchase: '₹ 1,20,450', outstanding: '₹ 18,400' },
  { name: 'M.K. Silver Emporium', purchase: '₹ 98,760', outstanding: '₹ 12,300' },
];

// Inventory summary
export const inventorySummaryData = {
  totalItems: 3247,
  totalWeight: '125,890',
  totalValue: '₹ 2,74,52,600',
  lowStockItems: 48,
  deadStockItems: 23,
  outOfStockItems: 11,
};

// Notifications
export const notificationsData = [
  { id: 1, icon: 'alert', title: 'Low Stock Alert', desc: '12 items are running low in stock', time: '10 mins ago', color: '#ef4444' },
  { id: 2, icon: 'payment', title: 'Payment Received', desc: '₹ 1,25,000 received from Shree Jewellers', time: '30 mins ago', color: '#22c55e' },
  { id: 3, icon: 'invoice', title: 'New Purchase Invoice', desc: 'PI-240517-002 has been created', time: '1 hour ago', color: '#3b82f6' },
  { id: 4, icon: 'return', title: 'Salesman Return', desc: 'Return stock received from Mahesh', time: '2 hours ago', color: '#f59e0b' },
  { id: 5, icon: 'backup', title: 'Daily Backup Completed', desc: 'Backup completed successfully', time: '3 hours ago', color: '#8b5cf6' },
];

// Tasks
export const tasksData = [
  { id: 1, title: 'Purchase Bill Approval', count: 2, color: '#f59e0b' },
  { id: 2, title: 'Sales Invoice Approval', count: 5, color: '#ef4444' },
  { id: 3, title: 'Salesman Reconciliation', count: 2, color: '#f59e0b' },
  { id: 4, title: 'Low Stock Review', count: 12, color: '#ef4444' },
];

// Sidebar navigation
export const sidebarNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
  { id: 'masters', label: 'Masters', icon: 'masters', path: '/masters', children: [
    { id: 'company-master', label: 'Company Master', path: '/masters/company' },
    { id: 'category-master', label: 'Category Master', path: '/masters/category' },
    { id: 'sub-category-master', label: 'Sub Category Master', path: '/masters/sub-category' },
    { id: 'item-master', label: 'Item Master', path: '/masters/item' },
    { id: 'unit-master', label: 'Unit Master', path: '/masters/unit' },
    { id: 'customer-master', label: 'Customer Master', path: '/masters/customer' },
    { id: 'supplier-master', label: 'Supplier Master', path: '/masters/supplier' },
    { id: 'employee-master', label: 'Employee Master', path: '/masters/employee' },
    { id: 'salesman-master', label: 'Salesman Master', path: '/masters/salesman' },
    { id: 'warehouse-master', label: 'Warehouse Master', path: '/masters/warehouse' },
    { id: 'bank-master', label: 'Bank Master', path: '/masters/bank' },
    { id: 'ledger-master', label: 'Ledger Master', path: '/masters/ledger' },
    { id: 'tax-master', label: 'Tax Master', path: '/masters/tax' },
    { id: 'currency-master', label: 'Currency Master', path: '/masters/currency' },
    { id: 'financial-year', label: 'Financial Year', path: '/masters/financial-year' },
  ]},
  { id: 'purchase', label: 'Purchase', icon: 'purchase', path: '/purchase', children: [
    { id: 'purchase-dashboard', label: 'Purchase Dashboard', path: '/purchase/dashboard' },
    { id: 'purchase-entry', label: 'Purchase Entry', path: '/purchase/entry' },
    { id: 'purchase-grn', label: 'GRN', path: '/purchase/grn' },
    { id: 'purchase-bills', label: 'Purchase Bills', path: '/purchase/bills' },
    { id: 'purchase-returns', label: 'Purchase Return', path: '/purchase/returns' },
    { id: 'purchase-expense', label: 'Expense on Purchase', path: '/purchase/expense' },
    { id: 'purchase-order', label: 'Purchase Order', path: '/purchase/order' },
    { id: 'purchase-supplier-rate', label: 'Supplier Rate List', path: '/purchase/supplier-rate' },
    { id: 'purchase-reports', label: 'Purchase Reports', path: '/purchase/reports' },
  ] },
  { id: 'inventory', label: 'Inventory', icon: 'inventory', path: '/inventory', children: [
    { id: 'inventory-overview', label: 'Stock Overview', path: '/inventory/overview' },
    { id: 'inventory-ledger', label: 'Stock Ledger', path: '/inventory/ledger' },
    { id: 'inventory-search', label: 'Stock Search', path: '/inventory/search' },
    { id: 'inventory-transfer', label: 'Stock Transfer', path: '/inventory/transfer' },
    { id: 'inventory-adjustment', label: 'Stock Adjustment', path: '/inventory/adjustment' },
    { id: 'inventory-take', label: 'Stock Take', path: '/inventory/take' },
    { id: 'inventory-opening', label: 'Opening Stock', path: '/inventory/opening' },
    { id: 'inventory-aging', label: 'Stock Aging Report', path: '/inventory/aging' },
    { id: 'inventory-item-summary', label: 'Item Wise Stock Summary', path: '/inventory/item-summary' },
  ]},
  { id: 'sales', label: 'Sales', icon: 'sales', path: '/sales', children: [
    { id: 'sales-dashboard', label: 'Sales Dashboard', path: '/sales/dashboard' },
    { id: 'sales-gst-invoice', label: 'New Sales Invoice (GST)', path: '/sales/gst-invoice' },
    { id: 'sales-cash-invoice', label: 'New Sales Invoice (Cash)', path: '/sales/cash-invoice' },
    { id: 'sales-order', label: 'Sales Order', path: '/sales/order' },
    { id: 'sales-returns', label: 'Sales Return', path: '/sales/returns' },
    { id: 'sales-challan', label: 'Delivery Challan', path: '/sales/challan' },
    { id: 'sales-invoice-list', label: 'Sales Invoice List', path: '/sales/invoice-list' },
    { id: 'sales-customer-ledger', label: 'Customer Ledger', path: '/sales/customer-ledger' },
    { id: 'sales-reports', label: 'Sales Reports', path: '/sales/reports' },
    { id: 'sales-registered-customers', label: 'Registered Customers', path: '/sales/registered-customers' },
  ] },
  { id: 'salesman', label: 'Salesman', icon: 'salesman', path: '/salesman', children: [
    { id: 'salesman-list', label: 'Salesman List', path: '/salesman/list' },
    { id: 'salesman-performance', label: 'Performance', path: '/salesman/performance' },
    { id: 'salesman-reconciliation', label: 'Reconciliation', path: '/salesman/reconciliation' },
    { id: 'salesman-commissions', label: 'Commissions', path: '/salesman/commissions' },
  ] },
  { id: 'reports', label: 'Reports', icon: 'reports', path: '/reports', children: [
    { id: 'reports-purchase-register', label: 'Purchase Register', path: '/reports/purchase-register' },
    { id: 'reports-sales-register', label: 'Sales Register', path: '/reports/sales-register' },
    { id: 'reports-gst-summary', label: 'GST Summary Report', path: '/reports/gst-summary' },
    { id: 'reports-stock-summary', label: 'Stock Summary Report', path: '/reports/stock-summary' },
    { id: 'reports-stock-aging', label: 'Stock Aging Report', path: '/reports/stock-aging' },
    { id: 'reports-outstanding', label: 'Outstanding Report', path: '/reports/outstanding' },
    { id: 'reports-profit-loss', label: 'Profit & Loss Report', path: '/reports/profit-loss' },
    { id: 'reports-trial-balance', label: 'Trial Balance', path: '/reports/trial-balance' },
    { id: 'reports-top-items', label: 'Top Items Report', path: '/reports/top-items' },
  ] },
  { id: 'accounts', label: 'Accounts', icon: 'accounts', path: '/accounts', children: [
    { id: 'accounts-cash-book', label: 'Cash Book', path: '/accounts/cash-book' },
    { id: 'accounts-bank-book', label: 'Bank Book', path: '/accounts/bank-book' },
    { id: 'accounts-journal-entry', label: 'Journal Entry', path: '/accounts/journal-entry' },
    { id: 'accounts-receipt-entry', label: 'Receipt Entry', path: '/accounts/receipt-entry' },
    { id: 'accounts-payment-entry', label: 'Payment Entry', path: '/accounts/payment-entry' },
    { id: 'accounts-contra-entry', label: 'Contra Entry', path: '/accounts/contra-entry' },
    { id: 'accounts-ledger', label: 'Ledger', path: '/accounts/ledger' },
    { id: 'accounts-trial-balance', label: 'Trial Balance', path: '/accounts/trial-balance' },
    { id: 'accounts-day-book', label: 'Day Book', path: '/accounts/day-book' },
  ] },
  { id: 'gst', label: 'GST', icon: 'gst', path: '/gst', children: [
    { id: 'gst-filing', label: 'GST Filing', path: '/gst/filing' },
    { id: 'gst-returns', label: 'GST Returns', path: '/gst/returns' },
    { id: 'gst-summary', label: 'GST Summary', path: '/gst/summary' },
    { id: 'gst-payments', label: 'GST Payments', path: '/gst/payments' },
    { id: 'gst-compliance', label: 'GST Compliance', path: '/gst/compliance' },
  ] },
  { id: 'tools', label: 'Tools', icon: 'tools', path: '/tools', children: [
    { id: 'tools-barcode-generator', label: 'Barcode Generator', path: '/tools/barcode-generator' },
    { id: 'tools-data-import', label: 'Data Import', path: '/tools/data-import' },
    { id: 'tools-data-export', label: 'Data Export', path: '/tools/data-export' },
    { id: 'tools-bulk-update', label: 'Bulk Update', path: '/tools/bulk-update' },
    { id: 'tools-stock-adjustment', label: 'Stock Adjustment', path: '/tools/stock-adjustment' },
    { id: 'tools-rate-calculator', label: 'Rate Calculator', path: '/tools/rate-calculator' },
    { id: 'tools-label-printer', label: 'Label Printer', path: '/tools/label-printer' },
    { id: 'tools-database-backup', label: 'Database Backup', path: '/tools/database-backup' },
    { id: 'tools-audit-log', label: 'Audit Log', path: '/tools/audit-log' },
  ] },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings', children: [
    { id: 'company-settings', label: 'Company Settings', path: '/settings/company' },
    { id: 'general-settings', label: 'General Settings', path: '/settings/general' },
    { id: 'financial-year-settings', label: 'Financial Year', path: '/settings/financial-year' },
    { id: 'users-roles', label: 'Users & Roles', path: '/settings/users-roles' },
    { id: 'permissions', label: 'Permissions', path: '/settings/permissions' },
    { id: 'backup-settings', label: 'Backup Settings', path: '/settings/backup' },
    { id: 'document-numbering', label: 'Document Numbering', path: '/settings/document-numbering' },
    { id: 'print-settings', label: 'Print Settings', path: '/settings/print' },
  ] },
];

// Company master data
export const companiesData = [
  {
    code: 'SILVEE925',
    name: 'Silvee925 Jewels Pvt. Ltd.',
    gstNo: '27ABCDE1234F1Z5',
    phone: '+91 88888 92525',
    email: 'info@silvee925.com',
    state: 'Maharashtra',
    status: 'Active',
    isDefault: true,
  },
  {
    code: 'SILVEE925-2',
    name: 'Silvee925 Exports Pvt. Ltd.',
    gstNo: '27ABCDE5678G1Z6',
    phone: '+91 77770 92525',
    email: 'exports@silvee925.com',
    state: 'Maharashtra',
    status: 'Active',
    isDefault: false,
  },
];
