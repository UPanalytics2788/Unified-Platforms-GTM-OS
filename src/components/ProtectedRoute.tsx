import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';

interface ProtectedRouteProps {
  user: User | null;
  role: string | null;
  allowedRoles?: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({ user, role, allowedRoles = ['admin'], children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
