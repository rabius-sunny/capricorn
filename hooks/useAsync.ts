'use client';

import useSWR from 'swr';

import { fetcher } from '@/lib/fetchers';

interface AsyncState<T> {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
  mutate: () => void;
}

export function useAsync<T>(url: string): AsyncState<T> {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    errorRetryCount: 2
  });

  return { data, error, isLoading, mutate };
}
