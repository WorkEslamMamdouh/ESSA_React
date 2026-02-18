interface AppConfig {
  appName: string;
  apiBaseUrl: string;
}

export const appConfig: AppConfig = {
  appName: 'ESSA Frontend React',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'
};
