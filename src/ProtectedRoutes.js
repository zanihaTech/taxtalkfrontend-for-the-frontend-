import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if admin is logged in
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;
