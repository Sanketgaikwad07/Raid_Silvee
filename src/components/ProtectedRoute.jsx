import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, module }) => {
  const { user, hasAccess } = useAuth();

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check module access
  if (module && !hasAccess(module)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
