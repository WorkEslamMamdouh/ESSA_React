import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { ConfigProvider } from '@/app/providers/ConfigProvider';
import { LocalizationProvider } from '@/app/providers/LocalizationProvider';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider>
      <LocalizationProvider>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ConfigProvider>
  );
};
