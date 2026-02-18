export const apiEndpoints = {
  navigationModules: '/api/navigation/modules',
  authPrivileges: '/api/auth/privileges',
  sessionBootstrap: '/api/session/bootstrap',
  resources: '/api/resources',
  moduleMetadata: (moduleCode: string) => `/api/modules/${moduleCode}/metadata`
} as const;
