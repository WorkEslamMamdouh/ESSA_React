import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
}

interface AuthContextValue {
  auth: AuthState;
  signIn: (userName: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    userName: null
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      signIn: (userName) => {
        setAuth({ isAuthenticated: true, userName });
      },
      signOut: () => {
        setAuth({ isAuthenticated: false, userName: null });
      }
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
