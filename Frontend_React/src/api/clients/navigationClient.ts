import { apiEndpoints } from '@/api/endpoints';
import { httpRequest } from '@/api/http';
import type { ModuleNavItem } from '@/api/contracts';

export const navigationClient = {
  getModules: () => httpRequest<ModuleNavItem[]>(apiEndpoints.navigationModules)
};
