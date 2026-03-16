'use client';

import { useAsync } from '@/hooks/useAsync';
import type {
  Service,
  GalleryImage,
  Testimonial,
  RNPackage,
  FAQItem,
  TeamMember,
  HeroContent,
  ContactInfo,
  TourRequest,
  ConsultationRequest,
  ReferralSubmission,
  CareersApplication,
  ContactSubmission,
  SubmissionType
} from '@/types';

type SubmissionDataMap = {
  tours: TourRequest[];
  consultations: ConsultationRequest[];
  referrals: ReferralSubmission[];
  careers: CareersApplication[];
  contacts: ContactSubmission[];
};

export function useAdminHero() {
  const { data, error, isLoading, mutate } = useAsync<HeroContent>('/admin/hero');
  return { hero: data, error, isLoading, mutate };
}

export function useAdminServices() {
  const { data, error, isLoading, mutate } = useAsync<Service[]>('/admin/services');
  return { services: data ?? [], error, isLoading, mutate };
}

export function useAdminGallery() {
  const { data, error, isLoading, mutate } = useAsync<GalleryImage[]>('/admin/gallery');
  return { images: data ?? [], error, isLoading, mutate };
}

export function useAdminTestimonials() {
  const { data, error, isLoading, mutate } = useAsync<Testimonial[]>('/admin/testimonials');
  return { testimonials: data ?? [], error, isLoading, mutate };
}

export function useAdminRNPackages() {
  const { data, error, isLoading, mutate } = useAsync<RNPackage[]>('/admin/rn-packages');
  return { packages: data ?? [], error, isLoading, mutate };
}

export function useAdminFAQ() {
  const { data, error, isLoading, mutate } = useAsync<FAQItem[]>('/admin/faq');
  return { items: data ?? [], error, isLoading, mutate };
}

export function useAdminTeam() {
  const { data, error, isLoading, mutate } = useAsync<TeamMember[]>('/admin/team');
  return { team: data ?? [], error, isLoading, mutate };
}

export function useAdminContactInfo() {
  const { data, error, isLoading, mutate } = useAsync<ContactInfo>('/admin/contact-info');
  return { contactInfo: data, error, isLoading, mutate };
}

export function useAdminSubmissions<T extends SubmissionType>(type: T) {
  const { data, error, isLoading, mutate } = useAsync<SubmissionDataMap[T]>(
    `/admin/submissions/${type}`
  );
  return {
    submissions: data ?? ([] as unknown as SubmissionDataMap[T]),
    error,
    isLoading,
    mutate
  };
}

export function useAdminDashboardCount(
  type: 'tours' | 'consultations' | 'referrals' | 'careers'
) {
  return useAsync<{ count: number }>(`/admin/submissions/${type}/count`);
}
