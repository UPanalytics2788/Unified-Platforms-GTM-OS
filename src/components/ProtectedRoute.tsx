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
  const adminEmails = ['shree@unifiedplatforms.com', 'analytics@unifiedplatforms.com'];
  const isHardcodedAdmin = user?.email && adminEmails.some(e => e.toLowerCase() === user.email?.toLowerCase());

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If they are a known admin by email, let them through even if the role state is still catching up
  if (isHardcodedAdmin && allowedRoles.includes('admin')) {
    return <>{children}</>;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
