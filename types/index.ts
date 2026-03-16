// /types/index.ts
// All shared TypeScript interfaces for Capricorn Group Care LLC

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  heroImage: string;
  heroImageAlt: string;
}

export interface Service {
  id: string;
  order: number;
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  room: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  relationship: string;
  rating: number;
  visible: boolean;
  imageUrl?: string;
}

export interface RNPackage {
  id: string;
  tier: string;
  price: number;
  tagline: string;
  features: string[];
  featured: boolean;
}

export interface FAQItem {
  id: string;
  order: number;
  question: string;
  answer: string;
  visible: boolean;
}

export interface TeamMember {
  id: string;
  order: number;
  name: string;
  title: string;
  bio?: string;
  photoUrl?: string;
}

export interface ContactInfo {
  companyName: string;
  email: string;
  website: string;
  phones: Array<{ name: string; number: string }>;
  address?: string;
  serviceAreas: string[];
}

export interface TrustIndicator {
  id: string;
  icon: string;
  label: string;
  description?: string;
}

export interface WhyChooseUsFeature {
  id: string;
  order: number;
  icon: string;
  title: string;
  description: string;
  image: string;
}

// ─── Submission Status ────────────────────────────────────

export type SubmissionStatus = 'new' | 'reviewed';

export interface TourRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  residentName: string;
  relationship: string;
  careNeeds: string;
  preferredDate: string;
  preferredTime: string;
  message?: string | null;
  status: string;
  createdAt: Date | string;
}

export interface ConsultationRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  consultationType: string;
  residentAge: string;
  careNeeds: string;
  preferredDate: string;
  message?: string | null;
  status: string;
  createdAt: Date | string;
}

export interface ReferralSubmission {
  id: string;
  referrerName: string;
  organization: string;
  phone: string;
  email: string;
  residentNeeds: string;
  timeline: string;
  notes?: string | null;
  status: string;
  createdAt: Date | string;
}

export interface CareersApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  position: string;
  resumeUrl: string;
  coverNote?: string | null;
  status: string;
  createdAt: Date | string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  message: string;
  status: string;
  createdAt: Date | string;
}

// ─── Form submission input types (client-side) ───────────

export interface TourRequestData {
  fullName: string;
  phone: string;
  email: string;
  residentName: string;
  relationship: string;
  careNeeds: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface RNConsultationData {
  fullName: string;
  phone: string;
  email: string;
  consultationType: string;
  residentAge: number;
  careNeeds: string;
  preferredDate: string;
  message?: string;
}

export interface ReferralData {
  referrerName: string;
  organization: string;
  phone: string;
  email: string;
  residentNeeds: string;
  timeline: string;
  notes?: string;
}

export interface CareersApplicationData {
  fullName: string;
  phone: string;
  email: string;
  position: string;
  resumeUrl: string;
  coverNote?: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  message: string;
}

// ─── Admin types ─────────────────────────────────────────

export interface AdminSession {
  email: string;
}

export type SubmissionType =
  | 'tours'
  | 'consultations'
  | 'referrals'
  | 'careers'
  | 'contacts';

export interface DashboardCount {
  tours: number;
  consultations: number;
  referrals: number;
  careers: number;
}

// ─── Server Action return type ───────────────────────────

export interface ActionResult {
  success: boolean;
  errors?: {
    formErrors: string[];
    fieldErrors: Record<string, string[] | undefined>;
  };
}
