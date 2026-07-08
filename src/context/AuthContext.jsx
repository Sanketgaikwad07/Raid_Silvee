import React, { createContext, useContext, useState, useCallback } from 'react';
import { api, ApiError, loadAuthState, saveAuthState } from '../lib/apiClient';

const AuthContext = createContext(null);

// Modules a SALES user can reach purely by role; fine-grained per-master access
// is additionally gated by the permissions the ADMIN granted (see hasAccess below).
const SALES_ROLE_MODULES = ['sales', 'salesman', 'reports'];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadAuthState()?.user ?? null);

  const login = useCallback(async (email, password) => {
    try {
      const data = await api.post('/api/auth/login', { email, password }, { auth: false });
      saveAuthState({ accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Unable to reach the server';
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(() => {
    const state = loadAuthState();
    if (state?.refreshToken) {
      api.post('/api/auth/logout', { refreshToken: state.refreshToken }, { auth: false }).catch(() => {});
    }
    saveAuthState(null);
    setUser(null);
  }, []);

  const hasAccess = useCallback((module) => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    return SALES_ROLE_MODULES.includes(module);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
