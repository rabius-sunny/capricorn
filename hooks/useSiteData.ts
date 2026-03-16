'use client';

import useSWR from 'swr';

import { fetcher } from '@/lib/fetchers';
import type {
  ContactInfo,
  GalleryImage,
  RNPackage,
  Service,
  Testimonial,
  TrustIndicator,
  FAQItem,
  TeamMember
} from '@/types';

export function useServices() {
  const { data, error, isLoading } = useSWR<Service[]>(
    '/api/services',
    fetcher
  );
  return { services: data ?? [], error, isLoading };
}

export function useGalleryImages() {
  const { data, error, isLoading } = useSWR<GalleryImage[]>(
    '/api/gallery',
    fetcher
  );
  return { images: data ?? [], error, isLoading };
}

export function useTestimonials() {
  const { data, error, isLoading } = useSWR<Testimonial[]>(
    '/api/testimonials',
    fetcher
  );
  return { testimonials: data ?? [], error, isLoading };
}

export function useRNPackages() {
  const { data, error, isLoading } = useSWR<RNPackage[]>(
    '/api/rn-packages',
    fetcher
  );
  return { packages: data ?? [], error, isLoading };
}

export function useFAQItems() {
  const { data, error, isLoading } = useSWR<FAQItem[]>('/api/faq', fetcher);
  return { items: data ?? [], error, isLoading };
}

export function useTeamMembers() {
  const { data, error, isLoading } = useSWR<TeamMember[]>('/api/team', fetcher);
  return { team: data ?? [], error, isLoading };
}

export function useContactInfo() {
  const { data, error, isLoading } = useSWR<ContactInfo>(
    '/api/contact-info',
    fetcher
  );
  return { contactInfo: data ?? null, error, isLoading };
}

export function useTrustIndicators() {
  const { data, error, isLoading } = useSWR<TrustIndicator[]>(
    '/api/trust-indicators',
    fetcher
  );
  return { indicators: data ?? [], error, isLoading };
}
