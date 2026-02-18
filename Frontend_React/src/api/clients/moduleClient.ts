import { apiEndpoints } from '@/api/endpoints';
import { httpRequest } from '@/api/http';
import type { ModuleMetadata } from '@/api/contracts';

export const moduleClient = {
  getMetadata: (moduleCode: string) =>
    httpRequest<ModuleMetadata>(apiEndpoints.moduleMetadata(moduleCode))
};
