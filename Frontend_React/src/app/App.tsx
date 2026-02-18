import { AppRouter } from '@/app/router/AppRouter';
import { AppProviders } from '@/app/providers/AppProviders';

export const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};
