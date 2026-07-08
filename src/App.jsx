import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Masters from './pages/Masters';
import CompanyMaster from './pages/CompanyMaster';
import CategoryMaster from './pages/CategoryMaster';
import SubCategoryMaster from './pages/SubCategoryMaster';
import ItemMaster from './pages/ItemMaster';
import UnitMaster from './pages/UnitMaster';
import CustomerMaster from './pages/CustomerMaster';
import SupplierMaster from './pages/SupplierMaster';
import EmployeeMaster from './pages/EmployeeMaster';
import SalesmanMaster from './pages/SalesmanMaster';
import WarehouseMaster from './pages/WarehouseMaster';
import BankMaster from './pages/BankMaster';
import LedgerMaster from './pages/LedgerMaster';
import TaxMaster from './pages/TaxMaster';
import CurrencyMaster from './pages/CurrencyMaster';
import FinancialYearMaster from './pages/FinancialYearMaster';
import Settings from './pages/Settings';
import Purchase from './pages/Purchase';
import Inventory from './pages/Inventory';
import InventorySubPage from './pages/InventorySubPage';
import PurchaseSubPage from './pages/PurchaseSubPage';
import ReportsSubPage from './pages/ReportsSubPage';
import AccountsSubPage from './pages/AccountsSubPage';
import SalesmanSubPage from './pages/SalesmanSubPage';
import GstSubPage from './pages/GstSubPage';
import ToolsSubPage from './pages/ToolsSubPage';
import SettingsSubPage from './pages/SettingsSubPage';
import Sales from './pages/Sales';
import SalesSubPage from './pages/SalesSubPage';
import RegisteredCustomers from './pages/RegisteredCustomers';
import Salesman from './pages/Salesman';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Gst from './pages/Gst';
import Tools from './pages/Tools';
import AccessDenied from './pages/AccessDenied';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="access-denied" element={<AccessDenied />} />

        {/* Masters - Admin Only */}
        <Route path="masters/company" element={<ProtectedRoute module="masters"><CompanyMaster /></ProtectedRoute>} />
        <Route path="masters/category" element={<ProtectedRoute module="masters"><CategoryMaster /></ProtectedRoute>} />
        <Route path="masters/sub-category" element={<ProtectedRoute module="masters"><SubCategoryMaster /></ProtectedRoute>} />
        <Route path="masters/item" element={<ProtectedRoute module="masters"><ItemMaster /></ProtectedRoute>} />
        <Route path="masters/unit" element={<ProtectedRoute module="masters"><UnitMaster /></ProtectedRoute>} />
        <Route path="masters/customer" element={<ProtectedRoute module="masters"><CustomerMaster /></ProtectedRoute>} />
        <Route path="masters/supplier" element={<ProtectedRoute module="masters"><SupplierMaster /></ProtectedRoute>} />
        <Route path="masters/employee" element={<ProtectedRoute module="masters"><EmployeeMaster /></ProtectedRoute>} />
        <Route path="masters/salesman" element={<ProtectedRoute module="masters"><SalesmanMaster /></ProtectedRoute>} />
        <Route path="masters/warehouse" element={<ProtectedRoute module="masters"><WarehouseMaster /></ProtectedRoute>} />
        <Route path="masters/bank" element={<ProtectedRoute module="masters"><BankMaster /></ProtectedRoute>} />
        <Route path="masters/ledger" element={<ProtectedRoute module="masters"><LedgerMaster /></ProtectedRoute>} />
        <Route path="masters/tax" element={<ProtectedRoute module="masters"><TaxMaster /></ProtectedRoute>} />
        <Route path="masters/currency" element={<ProtectedRoute module="masters"><CurrencyMaster /></ProtectedRoute>} />
        <Route path="masters/financial-year" element={<ProtectedRoute module="masters"><FinancialYearMaster /></ProtectedRoute>} />
        <Route path="masters/*" element={<ProtectedRoute module="masters"><Masters /></ProtectedRoute>} />

        {/* Purchase - Admin Only */}
        <Route path="purchase" element={<ProtectedRoute module="purchase"><Purchase /></ProtectedRoute>} />
        <Route path="purchase/dashboard" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Purchase Dashboard" description="View purchase metrics and order summaries." iconKey="dashboard" /></ProtectedRoute>} />
        <Route path="purchase/entry" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Purchase Entry" description="Create and manage purchase invoices." iconKey="entry" /></ProtectedRoute>} />
        <Route path="purchase/grn" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="GRN (Goods Received Note)" description="Record goods received from suppliers." iconKey="grn" /></ProtectedRoute>} />
        <Route path="purchase/bills" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Purchase Bills" description="Review supplier bills and payment status." iconKey="bills" /></ProtectedRoute>} />
        <Route path="purchase/returns" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Purchase Return" description="Manage purchase returns and adjustments." iconKey="returns" /></ProtectedRoute>} />
        <Route path="purchase/expense" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Expense on Purchase" description="Track purchase-related expenses." iconKey="expense" /></ProtectedRoute>} />
        <Route path="purchase/order" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Purchase Order" description="Create and manage purchase orders." iconKey="order" /></ProtectedRoute>} />
        <Route path="purchase/supplier-rate" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Supplier Rate List" description="Manage supplier rate lists and effective dates." iconKey="supplierRate" /></ProtectedRoute>} />
        <Route path="purchase/reports" element={<ProtectedRoute module="purchase"><PurchaseSubPage title="Purchase Reports" description="View purchase reports and analytics." iconKey="reports" /></ProtectedRoute>} />

        {/* Inventory - Admin Only */}
        <Route path="inventory" element={<ProtectedRoute module="inventory"><Inventory /></ProtectedRoute>} />
        <Route path="inventory/overview" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Overview" description="View the stock overview dashboard." iconKey="overview" /></ProtectedRoute>} />
        <Route path="inventory/ledger" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Ledger" description="View transaction history for stock movements." iconKey="ledger" /></ProtectedRoute>} />
        <Route path="inventory/search" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Search" description="Search stock by item, category, or warehouse." iconKey="search" /></ProtectedRoute>} />
        <Route path="inventory/transfer" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Transfer" description="Manage stock transfers between warehouses." iconKey="transfer" /></ProtectedRoute>} />
        <Route path="inventory/adjustment" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Adjustment" description="Record physical stock adjustments." iconKey="adjustment" /></ProtectedRoute>} />
        <Route path="inventory/take" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Take" description="Perform physical stock counting." iconKey="take" /></ProtectedRoute>} />
        <Route path="inventory/opening" element={<ProtectedRoute module="inventory"><InventorySubPage title="Opening Stock" description="Configure opening stock entries." iconKey="opening" /></ProtectedRoute>} />
        <Route path="inventory/aging" element={<ProtectedRoute module="inventory"><InventorySubPage title="Stock Aging Report" description="Review aging of stock by category." iconKey="aging" /></ProtectedRoute>} />
        <Route path="inventory/item-summary" element={<ProtectedRoute module="inventory"><InventorySubPage title="Item Wise Stock Summary" description="Review stock summary item-wise." iconKey="itemSummary" /></ProtectedRoute>} />

        {/* Sales - Admin + Salesman */}
        <Route path="sales" element={<ProtectedRoute module="sales"><Sales /></ProtectedRoute>} />
        <Route path="sales/dashboard" element={<ProtectedRoute module="sales"><SalesSubPage title="Sales Dashboard" description="View sales dashboard metrics and trends." iconKey="dashboard" /></ProtectedRoute>} />
        <Route path="sales/gst-invoice" element={<ProtectedRoute module="sales"><SalesSubPage title="New Sales Invoice (GST)" description="Create GST invoices for customers." iconKey="gstInvoice" /></ProtectedRoute>} />
        <Route path="sales/cash-invoice" element={<ProtectedRoute module="sales"><SalesSubPage title="New Sales Invoice (Cash)" description="Create cash sales invoices." iconKey="cashInvoice" /></ProtectedRoute>} />
        <Route path="sales/order" element={<ProtectedRoute module="sales"><SalesSubPage title="Sales Order" description="Create and manage sales orders." iconKey="order" /></ProtectedRoute>} />
        <Route path="sales/returns" element={<ProtectedRoute module="sales"><SalesSubPage title="Sales Return" description="Manage returned sales items." iconKey="returns" /></ProtectedRoute>} />
        <Route path="sales/challan" element={<ProtectedRoute module="sales"><SalesSubPage title="Delivery Challan" description="Create delivery challans for shipments." iconKey="challan" /></ProtectedRoute>} />
        <Route path="sales/invoice-list" element={<ProtectedRoute module="sales"><SalesSubPage title="Sales Invoice List" description="View and export sales invoices." iconKey="invoiceList" /></ProtectedRoute>} />
        <Route path="sales/customer-ledger" element={<ProtectedRoute module="sales"><SalesSubPage title="Customer Ledger" description="View customer ledger and balances." iconKey="ledger" /></ProtectedRoute>} />
        <Route path="sales/reports" element={<ProtectedRoute module="sales"><SalesSubPage title="Sales Reports" description="Generate sales reports and analytics." iconKey="reports" /></ProtectedRoute>} />
        <Route path="sales/registered-customers" element={<ProtectedRoute module="sales"><RegisteredCustomers /></ProtectedRoute>} />

        {/* Salesman - Admin + Salesman */}
        <Route path="salesman" element={<ProtectedRoute module="salesman"><Salesman /></ProtectedRoute>} />
        <Route path="salesman/list" element={<ProtectedRoute module="salesman"><SalesmanSubPage title="Salesman List" description="View all salesmen and their performance metrics." iconKey="list" /></ProtectedRoute>} />
        <Route path="salesman/performance" element={<ProtectedRoute module="salesman"><SalesmanSubPage title="Performance" description="Analyze salesman achievement and target coverage." iconKey="performance" /></ProtectedRoute>} />
        <Route path="salesman/reconciliation" element={<ProtectedRoute module="salesman"><SalesmanSubPage title="Reconciliation" description="Reconcile salesman collections and outstanding balances." iconKey="reconciliation" /></ProtectedRoute>} />
        <Route path="salesman/commissions" element={<ProtectedRoute module="salesman"><SalesmanSubPage title="Commissions" description="Manage salesman commission calculations and payments." iconKey="commissions" /></ProtectedRoute>} />

        {/* Accounts - Admin Only */}
        <Route path="accounts" element={<ProtectedRoute module="accounts"><Accounts /></ProtectedRoute>} />
        <Route path="accounts/cash-book" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Cash Book" description="Record cash receipts and payments." iconKey="cashBook" /></ProtectedRoute>} />
        <Route path="accounts/bank-book" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Bank Book" description="Manage bank receipts and payments." iconKey="bankBook" /></ProtectedRoute>} />
        <Route path="accounts/journal-entry" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Journal Entry" description="Create journal vouchers for accounting entries." iconKey="journalEntry" /></ProtectedRoute>} />
        <Route path="accounts/receipt-entry" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Receipt Entry" description="Enter customer receipts and cash collections." iconKey="receiptEntry" /></ProtectedRoute>} />
        <Route path="accounts/payment-entry" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Payment Entry" description="Record supplier and expense payments." iconKey="paymentEntry" /></ProtectedRoute>} />
        <Route path="accounts/contra-entry" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Contra Entry" description="Book internal fund transfers between cash and bank." iconKey="contraEntry" /></ProtectedRoute>} />
        <Route path="accounts/ledger" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Ledger" description="View account ledger transactions and balances." iconKey="ledger" /></ProtectedRoute>} />
        <Route path="accounts/trial-balance" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Trial Balance" description="Review accounting trial balance for reconciliation." iconKey="trialBalance" /></ProtectedRoute>} />
        <Route path="accounts/day-book" element={<ProtectedRoute module="accounts"><AccountsSubPage title="Day Book" description="Review day book transactions and cash/bank movements." iconKey="dayBook" /></ProtectedRoute>} />

        {/* Reports - Admin + Salesman */}
        <Route path="reports" element={<ProtectedRoute module="reports"><Reports /></ProtectedRoute>} />
        <Route path="reports/purchase-register" element={<ProtectedRoute module="reports"><ReportsSubPage title="Purchase Register" description="Detailed purchase register report." iconKey="purchaseRegister" /></ProtectedRoute>} />
        <Route path="reports/sales-register" element={<ProtectedRoute module="reports"><ReportsSubPage title="Sales Register" description="Detailed sales register report." iconKey="salesRegister" /></ProtectedRoute>} />
        <Route path="reports/gst-summary" element={<ProtectedRoute module="reports"><ReportsSubPage title="GST Summary Report" description="GST summary and tax report." iconKey="gstSummary" /></ProtectedRoute>} />
        <Route path="reports/stock-summary" element={<ProtectedRoute module="reports"><ReportsSubPage title="Stock Summary Report" description="Summary of current stock levels and valuation." iconKey="stockSummary" /></ProtectedRoute>} />
        <Route path="reports/stock-aging" element={<ProtectedRoute module="reports"><ReportsSubPage title="Stock Aging Report" description="Review stock aging and holding periods." iconKey="stockAging" /></ProtectedRoute>} />
        <Route path="reports/outstanding" element={<ProtectedRoute module="reports"><ReportsSubPage title="Outstanding Report" description="Customer and supplier outstanding balances." iconKey="outstanding" /></ProtectedRoute>} />
        <Route path="reports/profit-loss" element={<ProtectedRoute module="reports"><ReportsSubPage title="Profit & Loss Report" description="Profit and loss statement by period." iconKey="profitLoss" /></ProtectedRoute>} />
        <Route path="reports/trial-balance" element={<ProtectedRoute module="reports"><ReportsSubPage title="Trial Balance" description="Trial balance for accounting reconciliation." iconKey="trialBalance" /></ProtectedRoute>} />
        <Route path="reports/top-items" element={<ProtectedRoute module="reports"><ReportsSubPage title="Top Items Report" description="Top selling items and sales value." iconKey="topItems" /></ProtectedRoute>} />

        {/* GST - Admin Only */}
        <Route path="gst" element={<ProtectedRoute module="gst"><Gst /></ProtectedRoute>} />
        <Route path="gst/filing" element={<ProtectedRoute module="gst"><GstSubPage title="GST Filing" description="Manage GST filings and submissions." iconKey="gstr1" /></ProtectedRoute>} />
        <Route path="gst/returns" element={<ProtectedRoute module="gst"><GstSubPage title="GST Returns" description="View and manage return schedules and status." iconKey="gstr3b" /></ProtectedRoute>} />
        <Route path="gst/summary" element={<ProtectedRoute module="gst"><GstSubPage title="GST Summary" description="Review GST collected, paid, and payable." iconKey="summary" /></ProtectedRoute>} />
        <Route path="gst/payments" element={<ProtectedRoute module="gst"><GstSubPage title="GST Payments" description="Track GST payment status and ledger entries." iconKey="payment" /></ProtectedRoute>} />
        <Route path="gst/compliance" element={<ProtectedRoute module="gst"><GstSubPage title="Listing" description="GST compliance and return validation workflows." iconKey="compliance" /></ProtectedRoute>} />

        {/* Tools - Admin Only */}
        <Route path="tools" element={<ProtectedRoute module="tools"><Tools /></ProtectedRoute>} />
        <Route path="tools/barcode-generator" element={<ProtectedRoute module="tools"><ToolsSubPage title="Barcode Generator" description="Create and print barcodes for inventory items." iconKey="barcode" /></ProtectedRoute>} />
        <Route path="tools/data-import" element={<ProtectedRoute module="tools"><ToolsSubPage title="Data Import" description="Import inventory and transaction data from files." iconKey="import" /></ProtectedRoute>} />
        <Route path="tools/data-export" element={<ProtectedRoute module="tools"><ToolsSubPage title="Data Export" description="Export data to Excel, CSV, or PDF formats." iconKey="export" /></ProtectedRoute>} />
        <Route path="tools/bulk-update" element={<ProtectedRoute module="tools"><ToolsSubPage title="Bulk Update" description="Update item data and prices in bulk." iconKey="bulkUpdate" /></ProtectedRoute>} />
        <Route path="tools/stock-adjustment" element={<ProtectedRoute module="tools"><ToolsSubPage title="Stock Adjustment" description="Manage stock adjustment transactions." iconKey="adjustment" /></ProtectedRoute>} />
        <Route path="tools/rate-calculator" element={<ProtectedRoute module="tools"><ToolsSubPage title="Rate Calculator" description="Calculate tax-inclusive rates and margins." iconKey="rateCalculator" /></ProtectedRoute>} />
        <Route path="tools/label-printer" element={<ProtectedRoute module="tools"><ToolsSubPage title="Label Printer" description="Print price tags and item labels." iconKey="labelPrinter" /></ProtectedRoute>} />
        <Route path="tools/database-backup" element={<ProtectedRoute module="tools"><ToolsSubPage title="Database Backup" description="Backup and restore system data." iconKey="backup" /></ProtectedRoute>} />
        <Route path="tools/audit-log" element={<ProtectedRoute module="tools"><ToolsSubPage title="Audit Log" description="Review system activity and user actions." iconKey="audit" /></ProtectedRoute>} />

        {/* Settings - Admin Only */}
        <Route path="settings/*" element={<ProtectedRoute module="settings"><Settings /></ProtectedRoute>} />
        <Route path="settings/company" element={<ProtectedRoute module="settings"><SettingsSubPage title="Company Settings" description="Manage company address and business details." iconKey="company" /></ProtectedRoute>} />
        <Route path="settings/general" element={<ProtectedRoute module="settings"><SettingsSubPage title="General Settings" description="Configure app defaults and localization." iconKey="general" /></ProtectedRoute>} />
        <Route path="settings/financial-year" element={<ProtectedRoute module="settings"><SettingsSubPage title="Financial Year" description="Manage financial year configuration." iconKey="financial" /></ProtectedRoute>} />
        <Route path="settings/users-roles" element={<ProtectedRoute module="settings"><SettingsSubPage title="Users & Roles" description="Manage users, roles, and access rights." iconKey="users" /></ProtectedRoute>} />
        <Route path="settings/permissions" element={<ProtectedRoute module="settings"><SettingsSubPage title="Permissions" description="Configure permissions and security settings." iconKey="permissions" /></ProtectedRoute>} />
        <Route path="settings/backup" element={<ProtectedRoute module="settings"><SettingsSubPage title="Backup Settings" description="Configure backup and restore options." iconKey="backup" /></ProtectedRoute>} />
        <Route path="settings/document-numbering" element={<ProtectedRoute module="settings"><SettingsSubPage title="Document Numbering" description="Configure numbering formats for invoices and vouchers." iconKey="numbering" /></ProtectedRoute>} />
        <Route path="settings/print" element={<ProtectedRoute module="settings"><SettingsSubPage title="Print Settings" description="Manage print templates and settings." iconKey="print" /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
