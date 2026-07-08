import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Default credentials
const USERS = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Super Admin', avatar: 'A' },
  { username: 'sales', password: 'sales123', role: 'salesman', name: 'Sales User', avatar: 'S' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('silvee_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username, password) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const userData = { username: found.username, role: found.role, name: found.name, avatar: found.avatar };
      setUser(userData);
      sessionStorage.setItem('silvee_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid username or password' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('silvee_user');
  }, []);

  const hasAccess = useCallback((module) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    // Salesman can only access sales and reports
    const salesmanModules = ['sales', 'salesman', 'reports'];
    return salesmanModules.includes(module);
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
