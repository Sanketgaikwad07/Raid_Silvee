import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiFilter,
  FiDatabase, FiCheckCircle, FiXCircle, FiStar, FiX, FiLoader,
} from 'react-icons/fi';
import { ApiError } from '../lib/apiClient';
import './ModulePages.css';
import './MasterPageTemplate.css';

const DEFAULT_PAGE_SIZE = 10;

function coerceValue(field, rawValue) {
  if (field.type === 'number' || field.numeric) {
    return rawValue === '' || rawValue === null ? null : Number(rawValue);
  }
  if (field.type === 'checkbox') {
    return Boolean(rawValue);
  }
  return rawValue;
}

function buildInitialFormValues(fields, row) {
  const values = {};
  fields.forEach((field) => {
    if (row) {
      values[field.name] = row[field.responseKey || field.name] ?? (field.type === 'checkbox' ? false : '');
    } else {
      values[field.name] = field.defaultValue ?? (field.type === 'checkbox' ? false : '');
    }
  });
  return values;
}

/**
 * Generic CRUD table + modal form for a `/api/masters/*` resource.
 * Every Master page passes its own columns/formFields/api client; this
 * component owns fetching, search, pagination, and the add/edit/delete flow.
 */
const MasterPageTemplate = ({
  title,
  description,
  breadcrumbLabel,
  addButtonText,
  columns,
  formFields,
  api,
  idKey = 'id',
  extraListParams = {},
  filterOptions = [],
  rowActions = [],
  transformSubmitValues,
}) => {
  const [rows, setRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const [modalMode, setModalMode] = useState(null); // null | 'add' | 'edit'
  const [formValues, setFormValues] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [rowActionBusy, setRowActionBusy] = useState(null);
  const [fieldOptions, setFieldOptions] = useState({});

  const totalPages = Math.max(1, Math.ceil(totalElements / size));

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await api.list({ query, page, size, ...activeFilters, ...extraListParams });
      setRows(data.content ?? []);
      setTotalElements(data.totalElements ?? 0);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : 'Failed to load data from the server');
      setRows([]);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [api, query, page, size, JSON.stringify(activeFilters), JSON.stringify(extraListParams)]);

  useEffect(() => {
    const handle = setTimeout(fetchRows, query ? 300 : 0);
    return () => clearTimeout(handle);
  }, [fetchRows]);

  const loadFieldOptions = useCallback(async (field, currentValues) => {
    if (!field.loadOptions) return;
    try {
      const opts = await field.loadOptions(currentValues);
      setFieldOptions((prev) => ({ ...prev, [field.name]: opts }));
    } catch {
      setFieldOptions((prev) => ({ ...prev, [field.name]: [] }));
    }
  }, []);

  useEffect(() => {
    if (!modalMode) return;
    formFields.filter((f) => f.loadOptions && !f.dependsOn).forEach((field) => loadFieldOptions(field, formValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalMode]);

  const dependentFieldsKey = formFields
    .filter((f) => f.dependsOn)
    .map((f) => `${f.name}:${formValues[f.dependsOn] ?? ''}`)
    .join('|');

  useEffect(() => {
    if (!modalMode) return;
    formFields.filter((f) => f.loadOptions && f.dependsOn).forEach((field) => loadFieldOptions(field, formValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalMode, dependentFieldsKey]);

  const resolveOptions = (field) => fieldOptions[field.name] ?? field.options ?? [];

  const activeCount = useMemo(
    () => rows.filter((row) => String(row.status || '').toUpperCase() === 'ACTIVE').length,
    [rows],
  );
  const inactiveCount = rows.length - activeCount;
  const defaultRow = useMemo(
    () => rows.find((row) => row.defaultCompany || row.defaultCurrency || row.defaultWarehouse || row.activeYear),
    [rows],
  );
  const primaryLabel = columns[0]?.key;

  const openAddModal = () => {
    setEditingRow(null);
    setFormValues(buildInitialFormValues(formFields, null));
    setFormErrors([]);
    setModalMode('add');
  };

  const openEditModal = (row) => {
    setEditingRow(row);
    setFormValues(buildInitialFormValues(formFields, row));
    setFormErrors([]);
    setModalMode('edit');
  };

  const closeModal = () => {
    if (saving) return;
    setModalMode(null);
    setEditingRow(null);
  };

  const handleFieldChange = (field, rawValue) => {
    setFormValues((prev) => ({ ...prev, [field.name]: rawValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormErrors([]);
    try {
      const payload = {};
      formFields.forEach((field) => {
        payload[field.name] = coerceValue(field, formValues[field.name]);
      });
      const finalPayload = transformSubmitValues ? transformSubmitValues(payload, editingRow) : payload;

      if (modalMode === 'add') {
        await api.create(finalPayload);
      } else {
        await api.update(editingRow[idKey], finalPayload);
      }
      setModalMode(null);
      setEditingRow(null);
      await fetchRows();
    } catch (err) {
      if (err instanceof ApiError) {
        setFormErrors(err.errors?.length ? err.errors : [err.message]);
      } else {
        setFormErrors(['Unable to reach the server']);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row[primaryLabel] ?? row[idKey]}"? This cannot be undone.`)) {
      return;
    }
    setRowActionBusy(row[idKey]);
    try {
      await api.remove(row[idKey]);
      await fetchRows();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'Failed to delete');
    } finally {
      setRowActionBusy(null);
    }
  };

  const handleRowAction = async (action, row) => {
    setRowActionBusy(row[idKey]);
    try {
      await action.onClick(row);
      await fetchRows();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'Action failed');
    } finally {
      setRowActionBusy(null);
    }
  };

  const renderCell = (row, col) => {
    if (col.render) return col.render(row);
    const value = row[col.key];
    const valueText = String(value ?? '');
    const normalized = valueText.toLowerCase().replace(/\s+/g, '-');

    if (col.key === 'status') {
      return <span className={`badge badge--${normalized || 'active'}`}>{valueText}</span>;
    }
    return valueText;
  };

  return (
    <div className="module-page">
      <div className="module-breadcrumb">
        <span>Masters</span>
        <span className="sep">&rsaquo;</span>
        <span className="current">{breadcrumbLabel || title}</span>
      </div>

      <div className="module-header">
        <div>
          <h2 className="module-header__title">{title}</h2>
          <p className="module-header__desc">{description}</p>
        </div>
        <div className="module-header__actions">
          <button className="btn btn--primary" onClick={openAddModal}>
            <FiPlus size={14} /> {addButtonText || `Add ${title}`}
          </button>
        </div>
      </div>

      <div className="module-summary">
        <div className="module-summary-card">
          <div className="module-summary-card__icon blue"><FiDatabase size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Total Records</span>
            <span className="module-summary-card__value">{totalElements}</span>
            <span className="module-summary-card__sub">{title}</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon green"><FiCheckCircle size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Active (this page)</span>
            <span className="module-summary-card__value">{activeCount}</span>
            <span className="module-summary-card__sub">Ready to use</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon purple"><FiXCircle size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Inactive (this page)</span>
            <span className="module-summary-card__value">{inactiveCount}</span>
            <span className="module-summary-card__sub">Not in use</span>
          </div>
        </div>
        <div className="module-summary-card">
          <div className="module-summary-card__icon amber"><FiStar size={20} /></div>
          <div className="module-summary-card__info">
            <span className="module-summary-card__label">Default</span>
            <span className="module-summary-card__value module-summary-card__value--text">
              {defaultRow ? defaultRow[primaryLabel] : 'Not Set'}
            </span>
            <span className="module-summary-card__sub">Current selection</span>
          </div>
        </div>
      </div>

      <div className="module-table-card">
        <div className="module-toolbar">
          <div className="module-toolbar__left">
            <select
              className="module-toolbar__select"
              value={size}
              onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="module-toolbar__label">Entries Per Page</span>
          </div>
          <div className="module-toolbar__right">
            {filterOptions.map((filter) => (
              <select
                key={filter.name}
                className="module-toolbar__select"
                value={activeFilters[filter.name] ?? ''}
                onChange={(e) => {
                  setActiveFilters((prev) => ({ ...prev, [filter.name]: e.target.value }));
                  setPage(0);
                }}
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ))}
            <div className="module-toolbar__search">
              <FiSearch size={14} />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              />
            </div>
          </div>
        </div>

        {loadError && <div className="module-banner module-banner--error">{loadError}</div>}

        <div className="module-table-wrap">
          <table className="module-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={columns.length + 1} className="module-table-loading">
                    <FiLoader className="spin" size={16} /> Loading...
                  </td>
                </tr>
              )}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="module-table-empty">No records found</td>
                </tr>
              )}
              {!loading && rows.map((row) => (
                <tr key={row[idKey]}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                      {renderCell(row, col)}
                    </td>
                  ))}
                  <td className="text-center">
                    <div className="module-actions">
                      {rowActions.map((action) => (
                        (!action.show || action.show(row)) && (
                          <button
                            key={action.key}
                            className="module-action-btn"
                            title={action.label}
                            disabled={rowActionBusy === row[idKey]}
                            onClick={() => handleRowAction(action, row)}
                          >
                            {action.icon}
                          </button>
                        )
                      ))}
                      <button className="module-action-btn" title="Edit" onClick={() => openEditModal(row)}>
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        className="module-action-btn delete"
                        title="Delete"
                        disabled={rowActionBusy === row[idKey]}
                        onClick={() => handleDelete(row)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="module-table-footer">
          <span>
            {totalElements === 0
              ? 'No entries'
              : `Showing ${page * size + 1} to ${Math.min((page + 1) * size, totalElements)} of ${totalElements} entries`}
          </span>
          <div className="module-pagination">
            <button className="module-page-btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</button>
            <button className="module-page-btn active">{page + 1}</button>
            <button className="module-page-btn" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      </div>

      {modalMode && (
        <div className="master-modal-backdrop" onClick={closeModal}>
          <div className="master-modal" onClick={(e) => e.stopPropagation()}>
            <div className="master-modal__header">
              <h3>{modalMode === 'add' ? (addButtonText || `Add ${title}`) : `Edit ${title}`}</h3>
              <button className="master-modal__close" onClick={closeModal}><FiX size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="master-modal__body">
                {formErrors.length > 0 && (
                  <div className="module-banner module-banner--error">
                    <ul>{formErrors.map((err, i) => <li key={i}>{err}</li>)}</ul>
                  </div>
                )}
                <div className="master-form-grid">
                  {formFields.map((field) => (
                    <div key={field.name} className={`master-form-field ${field.fullWidth ? 'full-width' : ''}`}>
                      <label>{field.label}{field.required && <span className="required">*</span>}</label>
                      {field.type === 'select' ? (
                        <select
                          value={formValues[field.name] ?? ''}
                          required={field.required}
                          disabled={field.dependsOn && !formValues[field.dependsOn]}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                        >
                          <option value="" disabled>
                            {field.dependsOn && !formValues[field.dependsOn]
                              ? `Select ${field.dependsOnLabel || field.label} first`
                              : `Select ${field.label}`}
                          </option>
                          {resolveOptions(field).map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <input
                          type="checkbox"
                          checked={Boolean(formValues[field.name])}
                          onChange={(e) => handleFieldChange(field, e.target.checked)}
                        />
                      ) : (
                        <input
                          type={field.type || 'text'}
                          value={formValues[field.name] ?? ''}
                          placeholder={field.placeholder}
                          required={field.required}
                          step={field.step}
                          onChange={(e) => handleFieldChange(field, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="master-modal__footer">
                <button type="button" className="btn btn--outline" onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? 'Saving...' : modalMode === 'add' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPageTemplate;
