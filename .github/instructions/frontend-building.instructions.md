# Capricorn Group Care LLC — Frontend Build Instructions

**Stack:** Next.js (App Router) · React · Tailwind CSS · shadcn/ui  
**Project:** Capricorn Group Care LLC — Residential Care Website  
**Audience:** Families seeking senior/adult residential care, referral partners, job applicants

---

## 1. TECH STACK & TOOLING

```
Framework        Next.js 14+ (App Router)
Language         TypeScript
Styling          Tailwind CSS v3
Component Lib    shadcn/ui
Icons            lucide-react
Fonts            Google Fonts (see Section 3)
Animations       Tailwind transitions + Framer Motion (light use)
Form State       React Hook Form + Zod (client-side validation)
Form Submission  Next.js Server Actions (persisted to DB / fake JSON in dev)
Data Fetching    SWR + Axios (client components needing live/reactive data)
ORM              Prisma
Database         MongoDB Atlas
Image Handling   next/image (all images)
Routing          Next.js file-based routing (App Router)
```

---

## 2. PROJECT FOLDER STRUCTURE

```
/app
  /                          → Home page
  /about                     → About Us
  /services                  → Services
  /our-homes                 → Our Homes (gallery)
  /why-choose-us             → Why Choose Us
  /rn-consultation           → RN Care Plan Consultation
  /referral-partners         → Referral Partners
  /faq                       → FAQ
  /contact                   → Contact
  /schedule-a-tour           → Schedule a Tour
  /careers                   → Careers
  /privacy-policy            → Privacy Policy
  /terms                     → Terms & Conditions
  /thank-you/contact         → Thank You — Contact
  /thank-you/tour            → Thank You — Tour
  /thank-you/rn              → Thank You — RN Consultation
  /thank-you/referral        → Thank You — Referral
  /thank-you/careers         → Thank You — Careers

  /admin                     → Admin panel root (protected)
    /dashboard               → Admin dashboard overview
    /hero                    → Manage hero content
    /services                → Manage services
    /gallery                 → Manage gallery images
    /testimonials            → Manage testimonials
    /rn-packages             → Manage RN pricing packages
    /faq                     → Manage FAQ items
    /team                    → Manage team members
    /contact-info            → Manage site contact details
    /submissions
      /tours                 → Tour request submissions
      /consultations         → RN consultation submissions
      /referrals             → Referral submissions
      /careers               → Career application submissions
      /contacts              → General contact submissions

  /api
    /services/route.ts       → Dev JSON shim → future Prisma
    /gallery/route.ts
    /testimonials/route.ts
    /rn-packages/route.ts
    /faq/route.ts
    /team/route.ts
    /contact-info/route.ts
    /trust-indicators/route.ts

/components
  /layout
    Header.tsx
    Footer.tsx
    MobileNav.tsx
  /ui                        → shadcn/ui auto-generated components
  /sections                  → Page section components
  /forms
    ContactForm.tsx
    TourForm.tsx
    RNConsultationForm.tsx
    ReferralForm.tsx
    CareersForm.tsx
  /shared
    SectionHeader.tsx
    CTABanner.tsx
    TestimonialCard.tsx
    ServiceCard.tsx
    RNPricingCard.tsx
    GalleryGrid.tsx
    FAQAccordion.tsx
    TrustBadge.tsx
    PageHero.tsx
  /admin
    AdminLayout.tsx
    AdminSidebar.tsx
    DataTable.tsx
    ImageUploader.tsx
    RichTextEditor.tsx
    ConfirmDialog.tsx

/lib
  validations.ts             → Zod schemas for all forms
  axios.ts                   → Axios instance with base config
  fetchers.ts                → SWR fetcher functions
  prisma.ts                  → Prisma client singleton
  /data                      → Data accessor functions (swap JSON → Prisma here)
    getHeroContent.ts
    getServices.ts
    getGalleryImages.ts
    getTestimonials.ts
    getRNPackages.ts
    getFAQItems.ts
    getTeamMembers.ts
    getContactInfo.ts
    getTrustIndicators.ts
    getWhyChooseUs.ts

/actions                     → Next.js Server Actions
  submitTourRequest.ts
  submitContactForm.ts
  submitRNConsultation.ts
  submitReferral.ts
  submitCareersApplication.ts
  /admin
    updateHeroContent.ts
    updateService.ts
    updateGalleryImage.ts
    updateTestimonial.ts
    updateRNPackage.ts
    updateFAQ.ts
    updateTeamMember.ts
    updateContactInfo.ts
    deleteRecord.ts

/data                        → ⚠️ DEV ONLY — fake JSON (replace with Prisma later)
  hero.json
  services.json
  gallery.json
  testimonials.json
  rn-packages.json
  faq.json
  team.json
  contact-info.json
  trust-indicators.json
  why-choose-us.json

/hooks
  useSiteData.ts             → SWR hooks for public-facing data
  useAdminData.ts            → SWR hooks for admin data

/types
  index.ts                   → All shared TypeScript interfaces

/styles
  globals.css                → Tailwind base + CSS variables

/public
  /images                    → Static images (dev placeholders)
  /icons                     → SVG icons

/prisma
  schema.prisma              → Prisma schema (MongoDB Atlas)
```

---

## 3. DESIGN SYSTEM

### 3.1 Color Palette (CSS Variables)

Define in `globals.css`:

```css
:root {
  --color-teal: #2a9d8f;
  --color-teal-light: #4fbdae;
  --color-teal-dark: #1a7a6e;

  --color-blue: #3a86cc;
  --color-blue-light: #5fa3e0;
  --color-blue-dark: #2563a8;

  --color-purple: #7b5ea7;
  --color-purple-light: #9b7fc7;
  --color-purple-dark: #5b3f87;

  --color-gold: #d4a843;
  --color-gold-light: #e8c06a;

  --color-white: #ffffff;
  --color-gray-soft: #f4f6f8;
  --color-blue-gray: #b0bec5;
  --color-text-dark: #1e2a35;
  --color-text-mid: #4a5568;
  --color-text-light: #718096;

  --radius-card: 1rem;
  --radius-btn: 0.625rem;
  --shadow-card: 0 4px 24px rgba(42, 157, 143, 0.08);
  --shadow-elevated: 0 8px 40px rgba(42, 157, 143, 0.14);
}
```

Extend in `tailwind.config.ts`:

```ts
colors: {
  teal:    { DEFAULT: '#2A9D8F', light: '#4FBDAE', dark: '#1A7A6E' },
  brand:   { blue: '#3A86CC', purple: '#7B5EA7', gold: '#D4A843' },
  surface: { soft: '#F4F6F8', card: '#FFFFFF', muted: '#EEF2F6' },
}
```

### 3.2 Typography

```css
--font-heading: 'Cormorant Garamond', serif; /* H1, H2 display */
--font-body: 'DM Sans', sans-serif; /* body, labels, buttons */
```

Import in `layout.tsx` via `next/font/google` (weights: Cormorant 400/600, DM Sans 400/500/600).

**Type Scale:**
| Use | Tailwind Class |
|-----|----------------|
| Page H1 | `text-5xl lg:text-6xl font-heading font-semibold` |
| Section H2 | `text-3xl lg:text-4xl font-heading font-semibold` |
| Card H3 | `text-xl font-semibold font-body` |
| Body | `text-base font-body text-text-mid leading-relaxed` |
| Label / Caption | `text-sm font-label tracking-wide uppercase` |
| Button | `text-sm font-semibold font-body tracking-wide` |

### 3.3 Spacing System

- Section padding: `py-20 lg:py-28`
- Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 lg:p-8` · Card gap: `gap-6 lg:gap-8`

### 3.4 Design Rules

- `rounded-2xl` cards · `rounded-full` badges · `rounded-xl` buttons
- Soft shadows only — CSS variable `shadow-card`
- Hero/CTA backgrounds: teal→blue or blue→purple gradients
- **Avoid:** dark backgrounds (except footer), harsh borders, dense text blocks

---

## 4. DATA LAYER STRATEGY

### 4.1 Development Mode — Fake JSON

All dynamic content is served from `/data/*.json` during development.  
Each JSON file **must exactly mirror the TypeScript type and future Prisma model shape**.  
Components never import JSON directly — they always go through a data accessor function.

```
/data/hero.json              → HeroSection content
/data/services.json          → Services list
/data/gallery.json           → Gallery images
/data/testimonials.json      → Testimonials
/data/rn-packages.json       → RN pricing tiers
/data/faq.json               → FAQ items
/data/team.json              → Team members
/data/contact-info.json      → Company contact details
/data/trust-indicators.json  → Trust badge items
/data/why-choose-us.json     → Why choose us features
```

### 4.2 Data Accessor Pattern

All data access goes through functions in `/lib/data/`.  
These return fake JSON in dev and will be swapped to Prisma queries **without touching any component code**.

```ts
// /lib/data/getServices.ts
import servicesData from '@/data/services.json';
import type { Service } from '@/types';

export async function getServices(): Promise<Service[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return servicesData as Service[];
}
```

Create one accessor per data domain:
`getHeroContent` · `getServices` · `getGalleryImages` · `getTestimonials`  
`getRNPackages` · `getFAQItems` · `getTeamMembers` · `getContactInfo`  
`getTrustIndicators` · `getWhyChooseUs`

### 4.3 Server Components vs Client Components

| Data Type                           | Render Strategy      | Method                                  |
| ----------------------------------- | -------------------- | --------------------------------------- |
| Page content (hero, services, FAQs) | **Server Component** | `async` data accessor                   |
| Gallery with filter UI              | **Client Component** | SWR + Axios (after initial server pass) |
| Admin panel tables                  | **Client Component** | SWR + Axios                             |
| Form submissions                    | **Client Component** | Server Action                           |

### 4.4 SWR + Axios Setup

```ts
// /lib/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});
```

```ts
// /lib/fetchers.ts
import { apiClient } from './axios';
export const fetcher = (url: string) => apiClient.get(url).then((r) => r.data);
```

```ts
// /hooks/useSiteData.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetchers';

export function useTestimonials() {
  const { data, error, isLoading } = useSWR('/api/testimonials', fetcher);
  return { testimonials: data, error, isLoading };
}
// Duplicate pattern for each domain hook
```

### 4.5 Dev API Route Handlers (JSON Shims)

These serve fake JSON during dev. In production, replace `return NextResponse.json(data)` with a Prisma query.

```ts
// /app/api/testimonials/route.ts
import { NextResponse } from 'next/server';
import data from '@/data/testimonials.json';

export async function GET() {
  // TODO: return await prisma.testimonial.findMany({ where: { visible: true } })
  return NextResponse.json(data);
}
```

Create one route handler per domain: `services`, `gallery`, `testimonials`, `rn-packages`, `faq`, `team`, `contact-info`, `trust-indicators`.

### 4.6 Server Actions — Form Submission

All form submissions use Next.js Server Actions in `/actions/`.  
During dev, actions log to console.  
In production, they persist via Prisma to MongoDB Atlas.

```ts
// /actions/submitTourRequest.ts
'use server';
import { z } from 'zod';
import { TourRequestSchema } from '@/lib/validations';
// import { prisma } from '@/lib/prisma' ← uncomment when DB ready

export async function submitTourRequest(
  formData: z.infer<typeof TourRequestSchema>
) {
  const parsed = TourRequestSchema.safeParse(formData);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  // TODO: await prisma.tourRequest.create({ data: parsed.data })
  console.log('[DEV] Tour request:', parsed.data);
  return { success: true };
}
```

---

## 5. FAKE JSON DATA SCHEMAS

These files live in `/data/`. Each matches the TypeScript type and future Prisma model exactly.

### `hero.json`

```json
{
  "eyebrow": "Trusted Residential Care",
  "headline": "Compassionate Residential Care You Can Trust",
  "subheadline": "Providing safe and supportive residential care for seniors and adults who need assistance with daily living.",
  "primaryCTA": { "label": "Schedule a Tour", "href": "/schedule-a-tour" },
  "secondaryCTA": { "label": "Explore Our Homes", "href": "/our-homes" },
  "heroImage": "/images/hero-living-room.jpg",
  "heroImageAlt": "Warm and welcoming living room"
}
```

### `services.json`

```json
[
  {
    "id": "1",
    "order": 1,
    "icon": "Home",
    "title": "Residential Group Home Care",
    "description": "A safe, home-like environment with personalized support for daily living.",
    "href": "/services"
  },
  {
    "id": "2",
    "order": 2,
    "icon": "HeartHandshake",
    "title": "Daily Living Assistance",
    "description": "Support with dressing, bathing, grooming, and daily routines.",
    "href": "/services"
  },
  {
    "id": "3",
    "order": 3,
    "icon": "Pill",
    "title": "Medication Coordination",
    "description": "Structured medication management to ensure correct and timely care.",
    "href": "/services"
  },
  {
    "id": "4",
    "order": 4,
    "icon": "Users",
    "title": "Companion Care",
    "description": "Meaningful engagement and companionship for emotional well-being.",
    "href": "/services"
  },
  {
    "id": "5",
    "order": 5,
    "icon": "Accessibility",
    "title": "Mobility & Safety Support",
    "description": "Wide hallways, accessible bathrooms, and uncluttered layouts for safety.",
    "href": "/services"
  },
  {
    "id": "6",
    "order": 6,
    "icon": "Stethoscope",
    "title": "RN Care Plan Consultation",
    "description": "RN-backed care planning for families and residential providers.",
    "href": "/rn-consultation"
  }
]
```

### `gallery.json`

```json
[
  {
    "id": "1",
    "src": "/images/gallery/exterior.jpg",
    "alt": "Front exterior of the home",
    "room": "Exterior",
    "order": 1
  },
  {
    "id": "2",
    "src": "/images/gallery/living-room.jpg",
    "alt": "Bright, comfortable living room",
    "room": "Living Room",
    "order": 2
  },
  {
    "id": "3",
    "src": "/images/gallery/bedroom.jpg",
    "alt": "Private resident bedroom",
    "room": "Bedroom",
    "order": 3
  },
  {
    "id": "4",
    "src": "/images/gallery/kitchen.jpg",
    "alt": "Clean and accessible kitchen",
    "room": "Kitchen",
    "order": 4
  },
  {
    "id": "5",
    "src": "/images/gallery/dining.jpg",
    "alt": "Spacious dining room",
    "room": "Dining Room",
    "order": 5
  },
  {
    "id": "6",
    "src": "/images/gallery/bathroom.jpg",
    "alt": "Accessible, safe bathroom",
    "room": "Bathroom",
    "order": 6
  }
]
```

### `testimonials.json`

```json
[
  {
    "id": "1",
    "quote": "The team treated my mother with such warmth. We finally felt at peace.",
    "name": "Linda R.",
    "relationship": "Daughter of Resident",
    "rating": 5,
    "visible": true
  },
  {
    "id": "2",
    "quote": "I've referred multiple patients here. The environment truly feels like home.",
    "name": "Marcus T.",
    "relationship": "Hospital Case Manager",
    "rating": 5,
    "visible": true
  },
  {
    "id": "3",
    "quote": "The RN consultation gave our family a clear care plan and real peace of mind.",
    "name": "Sandra W.",
    "relationship": "Family Member",
    "rating": 5,
    "visible": true
  }
]
```

### `rn-packages.json`

```json
[
  {
    "id": "1",
    "tier": "Starter",
    "price": 350,
    "featured": false,
    "tagline": "For families getting started",
    "features": [
      "Initial RN assessment",
      "Basic care plan development",
      "Monthly review session"
    ]
  },
  {
    "id": "2",
    "tier": "Essential",
    "price": 750,
    "featured": true,
    "tagline": "Most popular choice",
    "features": [
      "Detailed RN assessment",
      "Personalized care plan",
      "Bi-weekly review sessions",
      "Family consultation call"
    ]
  },
  {
    "id": "3",
    "tier": "Comprehensive",
    "price": 1500,
    "featured": false,
    "tagline": "Full-service planning & support",
    "features": [
      "Full RN assessment",
      "Advanced care plan",
      "Weekly consultation support",
      "Compliance guidance",
      "Priority response"
    ]
  }
]
```

### `faq.json`

```json
[
  {
    "id": "1",
    "order": 1,
    "question": "What is a residential group home?",
    "answer": "A small home-like environment where residents receive personalized care and daily living assistance.",
    "visible": true
  },
  {
    "id": "2",
    "order": 2,
    "question": "Who is a good candidate for residential group care?",
    "answer": "Individuals needing assistance with dressing, bathing, medication coordination, and mobility support.",
    "visible": true
  },
  {
    "id": "3",
    "order": 3,
    "question": "How do I schedule a tour?",
    "answer": "Complete the Schedule a Tour form on the website or call our care team directly.",
    "visible": true
  },
  {
    "id": "4",
    "order": 4,
    "question": "What services are included in daily care?",
    "answer": "Assistance with daily living, medication coordination, companionship, and supportive supervision.",
    "visible": true
  },
  {
    "id": "5",
    "order": 5,
    "question": "Are the homes designed for mobility and safety?",
    "answer": "Yes — wide walking paths, accessible bathrooms, safety features, and uncluttered layouts.",
    "visible": true
  },
  {
    "id": "6",
    "order": 6,
    "question": "Do you provide RN care planning services?",
    "answer": "Yes. Three RN Care Plan Consultation tiers are available.",
    "visible": true
  },
  {
    "id": "7",
    "order": 7,
    "question": "Can hospitals or case managers refer residents?",
    "answer": "Yes. We work with hospitals, discharge planners, and case managers.",
    "visible": true
  },
  {
    "id": "8",
    "order": 8,
    "question": "How quickly can someone move in?",
    "answer": "Timelines depend on care needs and availability; we work as quickly as possible.",
    "visible": true
  }
]
```

### `contact-info.json`

```json
{
  "companyName": "Capricorn Group Care LLC",
  "email": "Admin@Capricornghs.com",
  "website": "www.Capricornghs.com",
  "phones": [
    { "name": "Brenda (RN)", "number": "469-667-2018" },
    { "name": "Precious (RN)", "number": "479-334-9933" }
  ],
  "address": "",
  "serviceAreas": [
    "McKinney",
    "Dallas",
    "Plano",
    "Frisco",
    "Collin County",
    "Texas"
  ]
}
```

### `trust-indicators.json`

```json
[
  {
    "id": "1",
    "icon": "Home",
    "label": "Home-Like Environment",
    "description": "Warm and residential, not clinical."
  },
  {
    "id": "2",
    "icon": "Stethoscope",
    "label": "RN Care Planning",
    "description": "Backed by registered nurse expertise."
  },
  {
    "id": "3",
    "icon": "ShieldCheck",
    "label": "Safe & Accessible",
    "description": "Wide paths, accessible bathrooms, safety features."
  },
  {
    "id": "4",
    "icon": "HeartHandshake",
    "label": "Family-Centered",
    "description": "Families kept informed and involved."
  }
]
```

### `why-choose-us.json`

```json
[
  {
    "id": "1",
    "order": 1,
    "icon": "ShieldCheck",
    "title": "Safety & Accessibility",
    "description": "Wide hallways, accessible bathrooms, and uncluttered spaces.",
    "image": "/images/why/safety.jpg"
  },
  {
    "id": "2",
    "order": 2,
    "icon": "ClipboardList",
    "title": "Personalized Care Plans",
    "description": "Every resident receives an individualized care plan with RN oversight.",
    "image": "/images/why/care-plans.jpg"
  },
  {
    "id": "3",
    "order": 3,
    "icon": "Stethoscope",
    "title": "RN-Backed Support",
    "description": "Medically sound care planning from qualified registered nurses.",
    "image": "/images/why/rn-support.jpg"
  },
  {
    "id": "4",
    "order": 4,
    "icon": "Home",
    "title": "Home-Like Environment",
    "description": "Care delivered in a familiar, comforting residential space.",
    "image": "/images/why/home-feel.jpg"
  }
]
```

---

## 6. DYNAMIC DATA MAP — PER PAGE

### Legend

- 🟢 **DYNAMIC** — from `/data/*.json` now; Prisma in production
- ⚪ **STATIC** — hardcoded JSX, no DB needed
- 🔵 **FORM** — user input via Server Action

---

### Home Page (`/`)

| Section           | Content                                                | Status | Source                  |
| ----------------- | ------------------------------------------------------ | ------ | ----------------------- |
| Hero              | Headline, subheadline, eyebrow, CTA labels, hero image | 🟢     | `hero.json`             |
| Trust Indicators  | Icon, label, description                               | 🟢     | `trust-indicators.json` |
| Welcome Block     | Heading, body, image                                   | 🟢     | `hero.json`             |
| Home Showcase     | First 3 gallery images + room labels                   | 🟢     | `gallery.json`          |
| Services Overview | Icon, title, description per card                      | 🟢     | `services.json`         |
| RN Highlight      | Tier pill labels, heading, description                 | 🟢     | `rn-packages.json`      |
| Testimonials      | Quote, name, relationship, rating                      | 🟢     | `testimonials.json`     |
| Gallery Preview   | First 6 gallery images                                 | 🟢     | `gallery.json`          |
| Final CTA         | Heading, button                                        | ⚪     | Hardcoded               |
| Header Logo       | Logo image                                             | 🟢     | `contact-info.json`     |
| Footer            | Phones, email, company name                            | 🟢     | `contact-info.json`     |

### About Us (`/about`)

| Section         | Content                       | Status | Source                    |
| --------------- | ----------------------------- | ------ | ------------------------- |
| Page Hero       | Title, subtitle               | ⚪     | Hardcoded                 |
| Mission & Story | Heading, paragraphs, image    | 🟢     | `hero.json` (about block) |
| Core Values     | Value name, icon, description | ⚪     | Hardcoded                 |
| Team Members    | Name, title, photo            | 🟢     | `team.json`               |

### Services (`/services`)

| Section       | Content                       | Status | Source          |
| ------------- | ----------------------------- | ------ | --------------- |
| Page Hero     | Title, subtitle               | ⚪     | Hardcoded       |
| Service Cards | Icon, title, full description | 🟢     | `services.json` |

### Our Homes (`/our-homes`)

| Section           | Content                           | Status | Source                   |
| ----------------- | --------------------------------- | ------ | ------------------------ |
| Page Hero         | Title, subtitle                   | ⚪     | Hardcoded                |
| Gallery Grid      | Image src, alt, room label, order | 🟢     | `gallery.json`           |
| Filter Categories | Derived from room field           | 🟢     | `gallery.json` (derived) |

### Why Choose Us (`/why-choose-us`)

| Section      | Content                         | Status | Source               |
| ------------ | ------------------------------- | ------ | -------------------- |
| Page Hero    | Title, subtitle                 | ⚪     | Hardcoded            |
| Feature Rows | Icon, title, description, image | 🟢     | `why-choose-us.json` |
| Stats Row    | Stat values + labels            | ⚪     | Hardcoded            |

### RN Care Plan Consultation (`/rn-consultation`)

| Section           | Content                              | Status | Source                 |
| ----------------- | ------------------------------------ | ------ | ---------------------- |
| Page Hero         | Title, subtitle                      | ⚪     | Hardcoded              |
| RN Introduction   | Heading, body                        | 🟢     | `rn-packages.json`     |
| Pricing Cards     | Tier, price, features, featured flag | 🟢     | `rn-packages.json`     |
| Contact Block     | RN names, phones, email              | 🟢     | `contact-info.json`    |
| Consultation Form | —                                    | 🔵     | `submitRNConsultation` |

### Referral Partners (`/referral-partners`)

| Section       | Content          | Status | Source              |
| ------------- | ---------------- | ------ | ------------------- |
| Page Hero     | Title, subtitle  | ⚪     | Hardcoded           |
| Intro & Steps | Step text, icons | ⚪     | Hardcoded           |
| Referral Form | —                | 🔵     | `submitReferral`    |
| Contact Block | Phones, email    | 🟢     | `contact-info.json` |

### FAQ (`/faq`)

| Section       | Content                 | Status | Source                    |
| ------------- | ----------------------- | ------ | ------------------------- |
| Page Hero     | Title, subtitle         | ⚪     | Hardcoded                 |
| FAQ Accordion | Question, answer, order | 🟢     | `faq.json` (visible only) |

### Schedule a Tour (`/schedule-a-tour`)

| Section          | Content         | Status | Source              |
| ---------------- | --------------- | ------ | ------------------- |
| Page Hero        | Title, subtitle | ⚪     | Hardcoded           |
| Info Block       | What to expect  | ⚪     | Hardcoded           |
| Tour Form        | —               | 🔵     | `submitTourRequest` |
| Contact Fallback | Phone numbers   | 🟢     | `contact-info.json` |

### Contact (`/contact`)

| Section      | Content                      | Status | Source              |
| ------------ | ---------------------------- | ------ | ------------------- |
| Page Hero    | Title, subtitle              | ⚪     | Hardcoded           |
| Contact Info | Email, phones, service areas | 🟢     | `contact-info.json` |
| Contact Form | —                            | 🔵     | `submitContactForm` |

### Careers (`/careers`)

| Section       | Content             | Status | Source                     |
| ------------- | ------------------- | ------ | -------------------------- |
| Page Hero     | Title, subtitle     | ⚪     | Hardcoded                  |
| Culture Block | Heading, paragraphs | ⚪     | Hardcoded                  |
| Careers Form  | —                   | 🔵     | `submitCareersApplication` |

---

## 7. SHARED LAYOUT COMPONENTS

### 7.1 `Header.tsx`

**Desktop:**

```
[Logo] | Home · About Us · Services · Our Homes · RN Consultation · FAQ · Contact | [Schedule a Tour →]
```

- `sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100`
- Logo: `next/image`, src from `contact-info.json`
- Nav links: `text-sm font-medium text-text-mid hover:text-teal transition-colors`
- Active: `text-teal font-semibold` via `usePathname()`
- CTA: `bg-teal text-white hover:bg-teal-dark rounded-xl px-5 py-2.5`

**Mobile (< md):** Hamburger → shadcn `<Sheet>` from right, stacked nav + CTA at bottom

**Dynamic:** Logo image from `getContactInfo()`

---

### 7.2 `Footer.tsx`

4-column desktop → 2-column tablet → stacked mobile  
Columns: Brand + contact info · Quick links · More links · Legal  
Style: `bg-[var(--color-text-dark)]` dark navy, white text, teal column headings  
**Dynamic:** Phones, email, company name from `getContactInfo()`

---

## 8. PAGE-BY-PAGE UI SPECIFICATIONS

### 8.1 HOME PAGE (`/`)

Data loading (Server Component):

```tsx
const hero = await getHeroContent();
const services = await getServices();
const gallery = await getGalleryImages();
const testimonials = await getTestimonials();
const rnPackages = await getRNPackages();
const trust = await getTrustIndicators();
```

**`HeroSection`** — 🟢 Dynamic

- `min-h-[90vh]`, gradient bg `from-teal/10 via-blue/5 to-purple/10`
- Props: `headline`, `subheadline`, `eyebrow`, `primaryCTA`, `secondaryCTA`, `heroImage`
- Primary CTA: `bg-teal text-white rounded-xl px-8 py-3.5`
- Secondary CTA: `border border-teal text-teal rounded-xl px-8 py-3.5`

**`TrustIndicatorsSection`** — 🟢 Dynamic

- 4-item row, `bg-white`, light border top/bottom
- Props: `items: TrustIndicator[]`

**`WelcomeSection`** — 🟢 Dynamic

- 2-col: text left, image right (reverses mobile)

**`HomeEnvironmentShowcase`** — 🟢 Dynamic

- 3 gallery images as room preview cards

**`ServicesOverviewSection`** — 🟢 Dynamic

- 3×2 `ServiceCard` grid

**`RNConsultationHighlight`** — 🟢 Dynamic

- Gradient `from-purple/10 to-teal/10`
- Tier pills derived from `rnPackages`

**`TestimonialsSection`** — 🟢 Dynamic

- 3 `TestimonialCard` components

**`GalleryPreviewSection`** — 🟢 Dynamic

- 6-image grid, `rounded-2xl`, hover scale

**`FinalCTASection`** — ⚪ Static

- `bg-gradient-to-r from-teal to-blue`, white text, white button

---

### 8.2 ABOUT US (`/about`)

Sections: PageHero · MissionBlock (🟢) · CoreValuesGrid (⚪) · TeamSection (🟢) · CTABanner

---

### 8.3 SERVICES (`/services`)

```tsx
const services = await getServices();
```

Sections: PageHero · ServiceCard×n (full description) · CTABanner

---

### 8.4 OUR HOMES (`/our-homes`)

```tsx
const gallery = await getGalleryImages(); // passed as initialData to client component
```

**GalleryGrid** is `'use client'`. Receives `initialData` prop.

- Filter tabs: derive categories `[...new Set(images.map(i => i.room))]`
- Active filter: `useState<string>('All')`
- Lightbox: shadcn `<Dialog>` on image click
- Images: `next/image fill` inside `aspect-[4/3]` container

---

### 8.5 WHY CHOOSE US (`/why-choose-us`)

```tsx
const features = await getWhyChooseUs();
```

Sections: PageHero · AlternatingFeatureRows (🟢) · StatsRow (⚪) · CTABanner

---

### 8.6 RN CARE PLAN CONSULTATION (`/rn-consultation`)

```tsx
const packages = await getRNPackages();
const contactInfo = await getContactInfo();
```

**RNPricingCard:**

```
[Tier label pill]      Starter / Essential / Comprehensive
[Price]                $350 / $750 / $1,500
[Tagline]              from rn-packages.json
[Feature list]         lucide Check icons
[CTA Button]           "Request This Plan"
```

Featured: `scale-105 border-2 border-teal ring-2 ring-teal/20`  
"Most Popular" badge: gold pill on top of featured card

---

### 8.7–8.11 (Remaining Pages)

Follow the Dynamic Data Map in Section 6 for data loading.  
All use `PageHero` · relevant content sections · forms where applicable.

---

### 8.12 THANK-YOU PAGES (`/thank-you/[type]`)

Single `ThankYouPage` component, static.  
Elements: `CheckCircle2` teal icon · confirmation title · next steps · phone · two CTA buttons

---

## 9. FORM COMPONENTS

**Stack:** React Hook Form + Zod validation + Server Action submission  
**No API calls from forms** — mutations go through Server Actions only.

### Shared Conventions

- Inputs: shadcn `<Input>`, `<Textarea>`, `<Select>`, `<Label>`
- Error message: `text-red-500 text-sm mt-1` below each field
- Submit: full-width teal shadcn `<Button type="submit">`
- Loading: `Loader2 animate-spin` inside button during pending state
- Success: replace form with `CheckCircle2` green success card
- Layout: `grid grid-cols-1 md:grid-cols-2 gap-4`

### 9A `ContactForm.tsx`

Fields: Full Name · Phone · Email · Reason (Select) · Message  
Action: `submitContactForm` → `/thank-you/contact`

### 9B `TourForm.tsx`

Fields: Full Name · Phone · Email · Resident Name · Relationship (Select) · Care Needs · Date · Time (Select) · Message  
Action: `submitTourRequest` → `/thank-you/tour`

### 9C `RNConsultationForm.tsx`

Fields: Full Name · Phone · Email · Consultation Type (Select) · Resident Age · Care Needs · Date · Message  
Action: `submitRNConsultation` → `/thank-you/rn`

### 9D `ReferralForm.tsx`

Fields: Referrer Name · Organization · Phone · Email · Resident Needs · Timeline (Select) · Notes  
Action: `submitReferral` → `/thank-you/referral`

### 9E `CareersForm.tsx`

Fields: Full Name · Phone · Email · Position · Resume Upload (`.pdf,.doc,.docx`) · Cover Note  
Action: `submitCareersApplication` → `/thank-you/careers`

---

## 10. REUSABLE SHARED COMPONENTS

### `PageHero.tsx`

Props: `title`, `subtitle?`, `breadcrumb?`  
Style: `bg-gradient-to-br from-teal/10 via-white to-blue/5 py-20`, centered text

### `SectionHeader.tsx`

Props: `label`, `title`, `subtitle?`, `align?: 'left' | 'center'`

### `CTABanner.tsx`

Props: `heading`, `subtext?`, `buttonLabel`, `buttonHref`, `variant?: 'teal' | 'dark'`

### `ServiceCard.tsx`

Props: `icon: string`, `title`, `description`, `href?`  
Style: `bg-white rounded-2xl p-6 shadow-card border-t-4 border-teal hover:shadow-elevated transition-all`

### `RNPricingCard.tsx`

Props: `tier`, `price`, `tagline`, `features: string[]`, `featured?: boolean`

### `TestimonialCard.tsx`

Props: `quote`, `name`, `relationship`, `rating?: number`

### `GalleryGrid.tsx` — `'use client'`

Props: `initialData: GalleryImage[]`  
State: `activeFilter: string`  
Lightbox: shadcn `<Dialog>`

### `FAQAccordion.tsx`

Props: `items: FAQItem[]`  
Uses shadcn `<Accordion type="single" collapsible>`, teal on active trigger

### `TrustBadge.tsx`

Props: `icon: string`, `label`, `description?`

---

## 11. NAVIGATION & ROUTING

### Header Nav Links

```ts
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Homes', href: '/our-homes' },
  { label: 'RN Consultation', href: '/rn-consultation' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
];
// CTA: { label: 'Schedule a Tour', href: '/schedule-a-tour' }
```

### Footer Nav Links

```ts
const footerLinks = {
  main: ['/', '/services', '/our-homes', '/rn-consultation'],
  more: ['/referral-partners', '/careers', '/faq', '/contact'],
  legal: ['/privacy-policy', '/terms']
};
```

---

## 12. ANIMATION & INTERACTION

### Scroll Reveal (Framer Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
```

### Stagger Children

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
```

### Hover States

- Cards: `hover:shadow-elevated transition-shadow duration-300`
- Buttons: `hover:scale-[1.02] transition-transform duration-200`
- Nav links: `hover:text-teal transition-colors duration-150`
- Gallery images: `hover:scale-105 transition-transform duration-300`

### Page Transition

```ts
// tailwind.config.ts
keyframes: { fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } } },
animation:  { fadeIn: 'fadeIn 0.4s ease-out' }
```

---

## 13. RESPONSIVE DESIGN

| Breakpoint | Width      | Layout                   |
| ---------- | ---------- | ------------------------ |
| Mobile     | < 640px    | 1-column, stacked        |
| Tablet     | 640–1024px | 2-column grids           |
| Desktop    | > 1024px   | 3-column grids, full nav |

Key rules:

- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Hero: `text-4xl md:text-5xl lg:text-6xl`
- Section: `py-16 lg:py-24`
- Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Pricing cards: stacked mobile → row `lg`
- Forms: 1-col mobile → 2-col `md`

---

## 14. ACCESSIBILITY

- `next/image` always has `alt`
- Focus ring: `focus-visible:ring-2 focus-visible:ring-teal`
- WCAG AA contrast: 4.5:1 body, 3:1 large text
- `<Label htmlFor>` paired with every input `id`
- Semantic HTML: `header`, `main`, `footer`, `nav`, `section`
- Skip link: `<a href="#main-content">Skip to content</a>` first in layout
- shadcn `<Sheet>` traps focus in mobile drawer
- shadcn `<Accordion>` is keyboard navigable

---

## 15. NEXT.JS SETUP

### `app/layout.tsx`

- Fonts: Cormorant Garamond (400/600) + DM Sans (400/500/600) via `next/font/google`
- Wrap: `<Header />` + `<main id="main-content">` + `<Footer />`
- Default metadata: `"%s | Capricorn Group Care LLC"`

### `next.config.ts`

```ts
images: {
  remotePatterns: [];
} // add CDN when media storage configured
```

### Per-page metadata

```ts
export const metadata: Metadata = { title: 'Page Title', description: '...' };
```

### `not-found.tsx`

Centered · friendly message · `← Back to Home` + `Contact Us`

---

## 16. SHADCN/UI COMPONENTS TO INSTALL

```bash
bunx shadcn@latest add \
  button input textarea label select form \
  accordion dialog sheet tabs card badge \
  separator navigation-menu breadcrumb \
  skeleton toast table
```

---

## 17. COMPLETE PAGE–COMPONENT MAP

| Page                 | Components                                                                                                                        | Dynamic Data Sources                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `/`                  | HeroSection, TrustIndicators, WelcomeSection, HomeShowcase, ServicesOverview, RNHighlight, Testimonials, GalleryPreview, FinalCTA | hero, services, gallery, testimonials, rn-packages, trust-indicators |
| `/about`             | PageHero, MissionBlock, ValuesGrid, TeamSection, CTABanner                                                                        | team                                                                 |
| `/services`          | PageHero, ServiceCard×n, CTABanner                                                                                                | services                                                             |
| `/our-homes`         | PageHero, GalleryGrid, CTABanner                                                                                                  | gallery                                                              |
| `/why-choose-us`     | PageHero, AlternatingFeatures, StatsRow, CTABanner                                                                                | why-choose-us                                                        |
| `/rn-consultation`   | PageHero, RNIntroBlock, RNPricingCard×3, ContactBlock, RNConsultationForm                                                         | rn-packages, contact-info                                            |
| `/referral-partners` | PageHero, IntroBlock, HowItWorks3Step, ReferralForm, ContactBlock                                                                 | contact-info                                                         |
| `/faq`               | PageHero, FAQAccordion, CTABanner                                                                                                 | faq                                                                  |
| `/schedule-a-tour`   | PageHero, TourInfoBlock, TourForm, ContactFallback                                                                                | contact-info                                                         |
| `/contact`           | PageHero, ContactInfoBlock, ContactForm                                                                                           | contact-info                                                         |
| `/careers`           | PageHero, CultureBlock, CareersForm                                                                                               | —                                                                    |
| `/privacy-policy`    | PageHero, LegalContent                                                                                                            | —                                                                    |
| `/terms`             | PageHero, LegalContent                                                                                                            | —                                                                    |
| `/thank-you/[type]`  | ThankYouPage                                                                                                                      | —                                                                    |
| `/admin/**`          | AdminLayout, AdminSidebar, DataTable, CRUD forms                                                                                  | all dynamic data                                                     |

---

_End of Frontend Build Instructions — Capricorn Group Care LLC_  
_Stack: Next.js · React · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · Prisma · MongoDB Atlas_
