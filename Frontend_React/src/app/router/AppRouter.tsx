import { Navigate, Route, Routes } from 'react-router-dom';
import { routePaths } from '@/app/router/routePaths';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import { LoginPage } from '@/modules/auth/pages/LoginPage';
import { HomePage } from '@/modules/home/pages/HomePage';
import { ProfilePage } from '@/modules/profile/pages/ProfilePage';
import { ModuleHostPage } from '@/modules/modules/pages/ModuleHostPage';
import { NotFoundPage } from '@/modules/common/pages/NotFoundPage';
import { AppLayout } from '@/modules/layout/components/AppLayout';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routePaths.home} replace />} />
      <Route path={routePaths.login} element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path={routePaths.profile} element={<ProfilePage />} />
        <Route path={routePaths.module} element={<ModuleHostPage />} />
      </Route>

      <Route path={routePaths.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={routePaths.notFound} replace />} />
    </Routes>
  );
};
