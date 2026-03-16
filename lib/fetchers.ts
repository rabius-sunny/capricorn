import { apiClient } from './axios';

export const fetcher = (url: string) => apiClient.get(url).then((r) => r.data);
