import { apiEndpoints } from '@/api/endpoints';
import { httpRequest } from '@/api/http';
import type { ResourceMap } from '@/api/contracts';

export const resourcesClient = {
  getResources: (lang: 'ar' | 'en') =>
    httpRequest<ResourceMap>(apiEndpoints.resources, {
      query: { lang }
    })
};
