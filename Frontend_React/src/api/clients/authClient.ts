import { apiEndpoints } from '@/api/endpoints';
import { httpRequest } from '@/api/http';
import type { PrivilegeItem } from '@/api/contracts';

interface GetPrivilegesParams {
  compCode: string;
  roleIds: string;
  finYear: string;
}

export const authClient = {
  getPrivileges: (params: GetPrivilegesParams) =>
    httpRequest<PrivilegeItem[]>(apiEndpoints.authPrivileges, {
      query: params
    })
};
