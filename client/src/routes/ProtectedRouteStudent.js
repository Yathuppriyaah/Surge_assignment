import React from 'react';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const ProtectedRouteStudent = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token) {
    return <Navigate to='/' />;
  }
  const decoded = jwt_decode(token);
  if (decoded.type !== 'student') {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRouteStudent;
