import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { appConfig } from '@/config/appConfig';

interface ConfigContextValue {
  apiBaseUrl: string;
  appName: string;
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export const ConfigProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo<ConfigContextValue>(
    () => ({
      apiBaseUrl: appConfig.apiBaseUrl,
      appName: appConfig.appName
    }),
    []
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('useConfig must be used inside ConfigProvider');
  }

  return context;
};
