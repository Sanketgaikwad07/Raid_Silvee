import React from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './ModulePages.css';

const subCategories = [
  { id: 1, name: 'Rings - Gold', category: 'Rings', desc: 'Gold rings collection', status: 'Active' },
  { id: 2, name: 'Pendants - Stones', category: 'Pendants', desc: 'Stone pendants', status: 'Active' },
  { id: 3, name: 'Chains - Silver', category: 'Chains', desc: 'Silver chains', status: 'Inactive' },
];

const SubCategoryMaster = () => {
  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Masters</span>
        <span className="sep">›</span>
        <span className="current">Sub Category Master</span>
      </div>

      <div className="module-header">
        <div>
          <h2 className="module-header__title">Sub Category Master</h2>
          <p className="module-header__desc">Manage sub categories for items</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--primary"><FiPlus size={14} /> Add Sub Category</button>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <select className="module-toolbar__select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="module-toolbar__label">Entries Per Page</span>
          </div>
          <div className="module-toolbar__right">
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input type="text" placeholder="Search sub categories..." />
            </div>
          </div>
        </div>

        <table className="module-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((sc) => (
              <tr key={sc.id}>
                <td className="font-medium">{sc.name}</td>
                <td>{sc.category}</td>
                <td>{sc.desc}</td>
                <td>
                  <span className={`badge ${sc.status === 'Active' ? 'badge--paid' : 'badge--pending'}`}>
                    {sc.status}
                  </span>
                </td>
                <td className="text-center">
                  <div className="module-actions">
                    <button className="module-action-btn" title="Edit"><FiEdit2 size={14} /></button>
                    <button className="module-action-btn delete" title="Delete"><FiTrash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="module-table-footer">
          <span>Showing 1 to {subCategories.length} of {subCategories.length} entries</span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled>Previous</button>
            <button className="module-page-btn active">1</button>
            <button className="module-page-btn" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryMaster;
