import { api } from './apiClient';

/**
 * Builds a CRUD client for a `/api/masters/<resource>` endpoint family.
 * Matches the pagination/search contract shared by every master controller
 * in the Spring Boot backend (page, size, query, status, plus extra params).
 */
export function createMasterApi(resourcePath, { extraActions = {} } = {}) {
  const base = `/api/masters/${resourcePath}`;

  const list = (params = {}) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        search.set(key, value);
      }
    });
    const qs = search.toString();
    return api.get(`${base}${qs ? `?${qs}` : ''}`);
  };

  const client = {
    list,
    get: (id) => api.get(`${base}/${id}`),
    create: (body) => api.post(base, body),
    update: (id, body) => api.put(`${base}/${id}`, body),
    remove: (id) => api.del(`${base}/${id}`),
  };

  Object.entries(extraActions).forEach(([name, path]) => {
    client[name] = (id) => api.put(`${base}/${id}${path}`);
  });

  return client;
}

export const companiesApi = createMasterApi('companies', { extraActions: { setDefault: '/set-default' } });
export const unitsApi = createMasterApi('units');
export const currenciesApi = createMasterApi('currencies', { extraActions: { setDefault: '/set-default' } });
export const taxesApi = createMasterApi('taxes');
export const warehousesApi = createMasterApi('warehouses', { extraActions: { setDefault: '/set-default' } });
export const banksApi = createMasterApi('banks');
export const financialYearsApi = createMasterApi('financial-years', { extraActions: { setActive: '/set-active' } });
export const categoriesApi = createMasterApi('categories');
export const subCategoriesApi = createMasterApi('sub-categories');
export const itemsApi = createMasterApi('items');
export const customersApi = createMasterApi('customers');
export const suppliersApi = createMasterApi('suppliers');
export const salesmenApi = createMasterApi('salesmen');
export const employeesApi = createMasterApi('employees');
export const ledgersApi = createMasterApi('ledgers');

export const usersApi = {
  list: () => api.get('/api/users'),
  get: (id) => api.get(`/api/users/${id}`),
  createEmployeeAccount: (body) => api.post('/api/users/employees', body),
  activate: (id) => api.put(`/api/users/${id}/activate`),
  deactivate: (id) => api.put(`/api/users/${id}/deactivate`),
  assignPermissions: (id, permissions) => api.put(`/api/users/${id}/permissions`, { permissions }),
};
