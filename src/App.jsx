import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
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
import Sales from './pages/Sales';
import Salesman from './pages/Salesman';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Gst from './pages/Gst';
import Tools from './pages/Tools';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="masters/company" element={<CompanyMaster />} />
        <Route path="masters/category" element={<CategoryMaster />} />
        <Route path="masters/sub-category" element={<SubCategoryMaster />} />
        <Route path="masters/item" element={<ItemMaster />} />
        <Route path="masters/unit" element={<UnitMaster />} />
        <Route path="masters/customer" element={<CustomerMaster />} />
        <Route path="masters/supplier" element={<SupplierMaster />} />
        <Route path="masters/employee" element={<EmployeeMaster />} />
        <Route path="masters/salesman" element={<SalesmanMaster />} />
        <Route path="masters/warehouse" element={<WarehouseMaster />} />
        <Route path="masters/bank" element={<BankMaster />} />
        <Route path="masters/ledger" element={<LedgerMaster />} />
        <Route path="masters/tax" element={<TaxMaster />} />
        <Route path="masters/currency" element={<CurrencyMaster />} />
        <Route path="masters/financial-year" element={<FinancialYearMaster />} />
        <Route path="masters/*" element={<Masters />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="sales" element={<Sales />} />
        <Route path="salesman" element={<Salesman />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="gst" element={<Gst />} />
        <Route path="tools" element={<Tools />} />
        <Route path="settings/*" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
