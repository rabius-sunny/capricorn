import { z } from 'zod';

// ─── Tour Request ──────────────────────────────────────────
export const TourRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  residentName: z.string().min(1, 'Resident name is required'),
  relationship: z.string().min(1, 'Please select your relationship'),
  careNeeds: z
    .string()
    .min(10, 'Please describe the care needs (at least 10 characters)'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  message: z.string().optional()
});

export type TourRequestInput = z.infer<typeof TourRequestSchema>;

// ─── RN Consultation ──────────────────────────────────────
export const RNConsultationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  consultationType: z.string().min(1, 'Please select consultation type'),
  residentAge: z.string().min(1, 'Resident age is required'),
  careNeeds: z.string().min(10, 'Please describe the care needs'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  message: z.string().optional()
});

export type RNConsultationInput = z.infer<typeof RNConsultationSchema>;

// ─── Referral Submission ──────────────────────────────────
export const ReferralSchema = z.object({
  referrerName: z.string().min(2, 'Your name is required'),
  organization: z.string().min(1, 'Organization is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  residentNeeds: z.string().min(10, 'Please describe the resident needs'),
  timeline: z.string().min(1, 'Please select timeline'),
  notes: z.string().optional()
});

export type ReferralInput = z.infer<typeof ReferralSchema>;

// ─── Careers Application ──────────────────────────────────
export const CareersApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  position: z.string().min(1, 'Position is required'),
  resumeUrl: z.string().min(1, 'Resume is required'),
  coverNote: z.string().optional()
});

export type CareersApplicationInput = z.infer<typeof CareersApplicationSchema>;

// ─── Contact Form ─────────────────────────────────────────
export const ContactFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  reason: z.string().min(1, 'Please select a reason'),
  message: z
    .string()
    .min(10, 'Please enter your message (at least 10 characters)')
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
