export interface ModuleNavItem {
  moduleCode: string;
  titleAr: string;
  titleEn: string;
  route: string;
  icon?: string;
  category?: string;
  order?: number;
}

export interface PrivilegeItem {
  moduleCode: string;
  access: boolean;
  available: boolean;
  canCreate?: boolean;
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}

export interface BootstrapSession {
  language: 'ar' | 'en';
  company: string;
  branch: string;
  finYear: string;
  user: string;
  controlFlags: Record<string, boolean>;
}

export type ResourceMap = Record<string, string>;

export interface ModuleMetadata {
  moduleCode: string;
  dependencies: string[];
  lookups: string[];
}
