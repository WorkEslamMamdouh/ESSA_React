import { Link, Outlet } from 'react-router-dom';
import { routePaths } from '@/app/router/routePaths';
import { useAuth } from '@/app/providers/AuthProvider';
import { useLocalization } from '@/app/providers/LocalizationProvider';

export const AppLayout = () => {
  const { auth, signOut } = useAuth();
  const { language, setLanguage, t } = useLocalization();

  return (
    <div>
      <header style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
        <Link to={routePaths.home}>{t('navigation.home')}</Link>
        <Link to={routePaths.profile}>{t('navigation.profile')}</Link>
        <Link to="/app/sample-module">{t('navigation.moduleHost')}</Link>
        <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} type="button">
          {t('actions.switchLanguage')}
        </button>
        <button onClick={() => signOut()} type="button">
          {t('actions.signOut')}
        </button>
        <strong>{auth.userName ?? 'Guest'}</strong>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
