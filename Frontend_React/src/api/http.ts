import { appConfig } from '@/config/appConfig';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

const createUrl = (path: string, query?: HttpRequestOptions['query']) => {
  const normalizedPath = path.startsWith('http') ? path : `${appConfig.apiBaseUrl}${path}`;
  const url = new URL(normalizedPath, window.location.origin);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

export const httpRequest = async <T>(path: string, options: HttpRequestOptions = {}): Promise<T> => {
  const { method = 'GET', query, headers, body, signal } = options;

  const response = await fetch(createUrl(path, query), {
    method,
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const message = `Request failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
