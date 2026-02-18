import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import { defaultLanguage, fallbackDictionary, type AppLanguage } from '@/localization/i18n';

interface LocalizationContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<AppLanguage>(defaultLanguage);

  const t = useCallback(
    (key: string) => {
      return fallbackDictionary[language][key] ?? key;
    },
    [language]
  );

  const value = useMemo<LocalizationContextValue>(
    () => ({
      language,
      setLanguage,
      t
    }),
    [language, t]
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error('useLocalization must be used inside LocalizationProvider');
  }

  return context;
};
