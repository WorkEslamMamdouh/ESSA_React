import { useNavigate } from 'react-router-dom';
import { routePaths } from '@/app/router/routePaths';
import { useAuth } from '@/app/providers/AuthProvider';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = () => {
    signIn('placeholder.user');
    navigate(routePaths.home, { replace: true });
  };

  return (
    <main>
      <h1>Login</h1>
      <p>Authentication UI and backend integration will be migrated in later phases.</p>
      <button type="button" onClick={handleLogin}>
        Sign in (stub)
      </button>
    </main>
  );
};
