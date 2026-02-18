import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { routePaths } from '@/app/router/routePaths';
import { useAuth } from '@/app/providers/AuthProvider';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to={routePaths.login} replace />;
  }

  return children;
};
