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

// ─── Admin Login ───────────────────────────────────────────
export const AdminLoginSchema = z.object({
  email: z.string().email('Valid email address required'),
  password: z.string().min(1, 'Password is required')
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

// ─── Admin Content Schemas ────────────────────────────────

export const HeroContentSchema = z.object({
  eyebrow: z.string().min(1, 'Eyebrow label is required'),
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
  primaryCTA: z.object({
    label: z.string().min(1, 'CTA label is required'),
    href: z.string().min(1, 'CTA link is required')
  }),
  secondaryCTA: z.object({
    label: z.string().min(1, 'CTA label is required'),
    href: z.string().min(1, 'CTA link is required')
  }),
  heroImage: z.string().min(1, 'Hero image is required'),
  heroImageAlt: z.string().min(1, 'Image alt text is required')
});

export type HeroContentInput = z.infer<typeof HeroContentSchema>;

export const ServiceSchema = z.object({
  order: z.string().min(1, 'Order is required'),
  icon: z.string().min(1, 'Icon name is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  href: z.string().min(1, 'Link is required')
});

export type ServiceInput = z.infer<typeof ServiceSchema>;

export const GalleryImageSchema = z.object({
  src: z.string().min(1, 'Image is required'),
  alt: z.string().min(1, 'Alt text is required'),
  room: z.string().min(1, 'Room category is required'),
  order: z.string().min(1, 'Order is required')
});

export type GalleryImageInput = z.infer<typeof GalleryImageSchema>;

export const TestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  quote: z.string().min(10, 'Testimonial quote is required'),
  rating: z.string().min(1, 'Rating is required'),
  visible: z.boolean(),
  imageUrl: z.string().optional()
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;

export const RNPackageSchema = z.object({
  tier: z.string().min(1, 'Tier name is required'),
  price: z.string().min(1, 'Price is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  features: z.array(z.string().min(1)).min(1, 'At least one feature required'),
  featured: z.boolean()
});

export type RNPackageInput = z.infer<typeof RNPackageSchema>;

export const FAQItemSchema = z.object({
  order: z.string().min(1, 'Order is required'),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  visible: z.boolean()
});

export type FAQItemInput = z.infer<typeof FAQItemSchema>;

export const TeamMemberSchema = z.object({
  order: z.string().min(1, 'Order is required'),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Job title is required'),
  bio: z.string().optional(),
  photoUrl: z.string().optional()
});

export type TeamMemberInput = z.infer<typeof TeamMemberSchema>;

export const ContactInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Valid email required'),
  website: z.string().min(1, 'Website is required'),
  phones: z.array(
    z.object({
      name: z.string().min(1),
      number: z.string().min(1)
    })
  ),
  address: z.string().optional(),
  serviceAreas: z.array(z.string().min(1))
});

export type ContactInfoInput = z.infer<typeof ContactInfoSchema>;
