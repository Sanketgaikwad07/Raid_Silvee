const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STORAGE_KEY = 'silvee_auth';

export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors || [];
  }
}

export function loadAuthState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAuthState(state) {
  if (state) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

let refreshPromise = null;

async function rawRequest(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const state = loadAuthState();
    if (state?.accessToken) {
      headers.Authorization = `Bearer ${state.accessToken}`;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      throw new ApiError('Server returned an unexpected response', { status: res.status });
    }
  }

  return { res, payload };
}

async function tryRefresh() {
  const state = loadAuthState();
  if (!state?.refreshToken) return false;

  if (!refreshPromise) {
    refreshPromise = rawRequest('/api/auth/refresh-token', {
      method: 'POST',
      body: { refreshToken: state.refreshToken },
      auth: false,
    }).finally(() => {
      refreshPromise = null;
    });
  }

  const { res, payload } = await refreshPromise;
  if (res.ok && payload?.success) {
    saveAuthState({
      accessToken: payload.data.accessToken,
      refreshToken: payload.data.refreshToken,
      user: payload.data.user,
    });
    return true;
  }
  saveAuthState(null);
  return false;
}

/** Calls the backend and unwraps the {success,message,data,errors} envelope. Retries once after a silent token refresh on 401. */
export async function apiRequest(path, options = {}) {
  let { res, payload } = await rawRequest(path, options);

  if (res.status === 401 && options.auth !== false) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      ({ res, payload } = await rawRequest(path, options));
    }
  }

  if (!res.ok || payload?.success === false) {
    const message = payload?.message || `Request failed with status ${res.status}`;
    throw new ApiError(message, { status: res.status, errors: payload?.errors });
  }

  return payload?.data;
}

export const api = {
  get: (path) => apiRequest(path, { method: 'GET' }),
  post: (path, body, options) => apiRequest(path, { method: 'POST', body, ...options }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body }),
  del: (path) => apiRequest(path, { method: 'DELETE' }),
};

export { BASE_URL, STORAGE_KEY };
