import { apiEndpoints } from '@/api/endpoints';
import { httpRequest } from '@/api/http';
import type { BootstrapSession } from '@/api/contracts';

export const sessionClient = {
  getBootstrap: () => httpRequest<BootstrapSession>(apiEndpoints.sessionBootstrap)
};
