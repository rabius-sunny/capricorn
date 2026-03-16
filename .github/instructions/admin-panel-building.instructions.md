# Capricorn Group Care LLC — Admin Panel Structure Guide

**Stack:** Next.js App Router · shadcn/ui · Tailwind CSS · SWR + Axios · Next.js Server Actions · Prisma · MongoDB Atlas

---

## 1. ADMIN PANEL OVERVIEW

The admin panel lives under `/app/admin/` and is a fully protected, separate section of the Next.js application. It allows non-technical Capricorn Group Care staff to manage all dynamic website content and review all form submissions — without touching code.

### Admin Goals

- Edit all dynamic public-facing content (hero, services, gallery, FAQs, etc.)
- View and manage all form submissions (tours, consultations, referrals, careers, contacts)
- Full CRUD for every content domain
- Clean, simple UI built for non-technical users

### Data Flow Architecture

```
Admin UI (Client Component)
       │
       ├─── READ:   SWR + Axios → /api/admin/[resource] → Prisma → MongoDB
       │
       └─── WRITE:  Server Action → Prisma → MongoDB → SWR revalidation
```

- **Data Fetching:** SWR + Axios for all admin reads (tables, forms pre-filled for edit)
- **Data Mutations:** Next.js Server Actions for all creates, updates, deletes
- **No direct Prisma calls in client components** — always through Server Actions or API routes

---

## 2. ADMIN ROUTES (FULL MAP)

```
/admin
  /dashboard                   → Overview stats + quick links
  /hero                        → Edit hero section content
  /services                    → List + CRUD for services
  /gallery                     → List + CRUD for gallery images
  /testimonials                → List + CRUD for testimonials
  /rn-packages                 → List + CRUD for RN pricing tiers
  /faq                         → List + CRUD for FAQ items
  /team                        → List + CRUD for team members
  /contact-info                → Edit global contact information
  /submissions
    /tours                     → View tour request submissions
    /consultations             → View RN consultation submissions
    /referrals                 → View referral partner submissions
    /careers                   → View career application submissions
    /contacts                  → View general contact submissions
```

---

## 3. ADMIN LAYOUT STRUCTURE

### `AdminLayout.tsx`

Wraps all `/admin/**` pages. Contains the sidebar and top header.

```
┌─────────────────────────────────────────────────────────────┐
│  ADMIN HEADER (top bar)                                     │
│  Logo · "Admin Panel" label · [View Site →] · [Logout]     │
├──────────────────┬──────────────────────────────────────────┤
│  SIDEBAR         │  MAIN CONTENT AREA                       │
│  (240px fixed)   │  (flex-1, scrollable)                    │
│                  │                                          │
│  Dashboard       │  Page content renders here               │
│  ─────────────   │                                          │
│  Content         │                                          │
│  > Hero          │                                          │
│  > Services      │                                          │
│  > Gallery       │                                          │
│  > Testimonials  │                                          │
│  > RN Packages   │                                          │
│  > FAQ           │                                          │
│  > Team          │                                          │
│  > Contact Info  │                                          │
│  ─────────────   │                                          │
│  Submissions     │                                          │
│  > Tours         │                                          │
│  > Consultations │                                          │
│  > Referrals     │                                          │
│  > Careers       │                                          │
│  > Contacts      │                                          │
└──────────────────┴──────────────────────────────────────────┘
```

### `AdminSidebar.tsx`

- Style: `w-60 bg-[var(--color-text-dark)] text-white h-screen sticky top-0`
- Section headers: small teal uppercase labels
- Nav items: `text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2`
- Active item: `bg-teal/20 text-teal font-medium`
- Use `usePathname()` for active state
- Collapsible on mobile (shadcn `<Sheet>`)

### Admin Top Header

- `bg-white border-b border-gray-200 px-6 py-3`
- Left: Logo + "Admin Panel" badge
- Right: `[← View Site]` link + `[Logout]` button

---

## 4. ADMIN DASHBOARD (`/admin/dashboard`)

### Layout

Stats overview cards at top + quick action links below.

### Stats Cards (4 cards)

Each card shows a count pulled via SWR:

| Card                  | Data        | API Endpoint                                     |
| --------------------- | ----------- | ------------------------------------------------ |
| Tour Requests         | Total count | `GET /api/admin/submissions/tours/count`         |
| Consultation Requests | Total count | `GET /api/admin/submissions/consultations/count` |
| Referral Submissions  | Total count | `GET /api/admin/submissions/referrals/count`     |
| Career Applications   | Total count | `GET /api/admin/submissions/careers/count`       |

Card style: `bg-white rounded-2xl p-6 shadow-card border-l-4 border-teal`

### Recent Activity Table

Latest 5 submissions across all form types, sorted by `createdAt desc`.  
Columns: Type · Name · Date · Status · [View →]

### Quick Action Links

Button row: `Edit Hero` · `Add Service` · `Upload Gallery Image` · `Add FAQ`

---

## 5. CONTENT MANAGEMENT SECTIONS

---

### 5.1 Hero Content (`/admin/hero`)

**Purpose:** Edit the homepage hero section.  
**Operations:** Edit only (single record, no list/delete).

**Data fetching:**

```ts
// SWR hook
const { data: hero, mutate } = useSWR('/api/admin/hero', fetcher);
```

**Form fields:**
| Field | Input Type |
|-------|-----------|
| Eyebrow label | Text input |
| Headline | Text input |
| Subheadline | Textarea |
| Primary CTA label | Text input |
| Primary CTA href | Text input |
| Secondary CTA label | Text input |
| Secondary CTA href | Text input |
| Hero image | `ImageUploader` component |
| Hero image alt text | Text input |

**Server Action:**

```ts
// /actions/admin/updateHeroContent.ts
'use server';
export async function updateHeroContent(data: HeroContent) {
  // await prisma.heroContent.upsert({ where: { id: 'singleton' }, update: data, create: data })
}
```

**UI pattern:** Single form, "Save Changes" button, optimistic update via `mutate()`.

---

### 5.2 Services (`/admin/services`)

**Purpose:** Manage the services list displayed on the homepage and Services page.  
**Operations:** Create · Read (list) · Update · Delete · Reorder

**List view:**

- `DataTable` component with columns: Order · Icon · Title · Description (truncated) · [Edit] · [Delete]
- "Add New Service" button at top right
- Drag-to-reorder rows (updates `order` field)

**Data fetching:**

```ts
const { data: services, mutate } = useSWR('/api/admin/services', fetcher);
```

**Create / Edit form (shadcn `<Dialog>` or `/admin/services/new` page):**
| Field | Input Type |
|-------|-----------|
| Order | Number input |
| Icon name | Text input (lucide icon name string) |
| Title | Text input |
| Description | Textarea |
| Link href | Text input |

**Server Actions:**

```ts
// /actions/admin/updateService.ts  — create + update
// /actions/admin/deleteRecord.ts   — generic delete by id + collection
```

---

### 5.3 Gallery (`/admin/gallery`)

**Purpose:** Manage the gallery images shown on Our Homes page and homepage preview.  
**Operations:** Upload · Read (grid) · Update (alt text, room label) · Delete · Reorder

**List view:** Image grid with room label badge, alt text, order number, [Edit] [Delete] per item.  
"Upload New Image" button at top right opens `ImageUploader` dialog.

**Data fetching:**

```ts
const { data: images, mutate } = useSWR('/api/admin/gallery', fetcher);
```

**`ImageUploader` component:**

- Drag-and-drop or click-to-browse file input
- Preview before upload
- Uploads to `/public/images/gallery/` (dev) or cloud storage (production)
- On upload: calls Server Action with file path + metadata

**Create / Edit form fields:**
| Field | Input Type |
|-------|-----------|
| Image file | `ImageUploader` |
| Alt text | Text input |
| Room category | Select: Exterior · Living Room · Bedroom · Kitchen · Dining Room · Bathroom |
| Order | Number input |

**Server Actions:** `updateGalleryImage`, `deleteRecord`

---

### 5.4 Testimonials (`/admin/testimonials`)

**Purpose:** Manage testimonials shown on homepage.  
**Operations:** Create · Read · Update · Delete · Toggle visibility

**List view:**

- `DataTable` with columns: Name · Relationship · Quote (truncated) · Visible (toggle) · Rating · [Edit] [Delete]

**Data fetching:**

```ts
const { data: testimonials, mutate } = useSWR(
  '/api/admin/testimonials',
  fetcher
);
```

**Create / Edit form:**
| Field | Input Type |
|-------|-----------|
| Name | Text input |
| Relationship / Title | Text input |
| Testimonial quote | Textarea |
| Rating | Select 1–5 or star picker |
| Visible | Toggle switch (shadcn `<Switch>`) |
| Profile image (optional) | `ImageUploader` |

**Server Action:** `updateTestimonial`, `deleteRecord`  
**Visibility toggle:** Inline Server Action call, SWR `mutate()` after response.

---

### 5.5 RN Packages (`/admin/rn-packages`)

**Purpose:** Manage the three RN Care Plan Consultation pricing tiers.  
**Operations:** Read · Update only (tiers are fixed at 3, no add/delete)

**List view:** 3-card preview matching the public pricing cards.  
"Edit" button on each card opens edit form.

**Data fetching:**

```ts
const { data: packages, mutate } = useSWR('/api/admin/rn-packages', fetcher);
```

**Edit form per tier:**
| Field | Input Type |
|-------|-----------|
| Tier name | Text input |
| Price | Number input |
| Tagline | Text input |
| Features list | Dynamic list — add/remove text items |
| Featured flag | Toggle switch |

**Server Action:** `updateRNPackage`

---

### 5.6 FAQ (`/admin/faq`)

**Purpose:** Manage FAQ items shown on the FAQ page.  
**Operations:** Create · Read · Update · Delete · Reorder · Toggle visibility

**List view:**

- `DataTable` with columns: Order · Question (truncated) · Visible (toggle) · [Edit] [Delete]
- "Add New FAQ" button top right
- Drag-to-reorder rows

**Data fetching:**

```ts
const { data: faqItems, mutate } = useSWR('/api/admin/faq', fetcher);
```

**Create / Edit form:**
| Field | Input Type |
|-------|-----------|
| Order | Number input |
| Question | Text input |
| Answer | `RichTextEditor` or large Textarea |
| Visible | Toggle switch |

**Server Action:** `updateFAQ`, `deleteRecord`

---

### 5.7 Team Members (`/admin/team`)

**Purpose:** Manage team member cards shown on the About Us page.  
**Operations:** Create · Read · Update · Delete · Reorder

**List view:** Card grid with photo, name, title, [Edit] [Delete].

**Data fetching:**

```ts
const { data: team, mutate } = useSWR('/api/admin/team', fetcher);
```

**Create / Edit form:**
| Field | Input Type |
|-------|-----------|
| Name | Text input |
| Job title | Text input |
| Bio (optional) | Textarea |
| Photo | `ImageUploader` |
| Order | Number input |

**Server Action:** `updateTeamMember`, `deleteRecord`

---

### 5.8 Contact Info (`/admin/contact-info`)

**Purpose:** Edit global company contact details used in Header, Footer, and Contact page.  
**Operations:** Edit only (single record).

**Data fetching:**

```ts
const { data: contactInfo, mutate } = useSWR(
  '/api/admin/contact-info',
  fetcher
);
```

**Form fields:**
| Field | Input Type |
|-------|-----------|
| Company name | Text input |
| Email address | Email input |
| Website URL | Text input |
| Phone 1 — name | Text input |
| Phone 1 — number | Text input |
| Phone 2 — name | Text input |
| Phone 2 — number | Text input |
| Address (optional) | Text input |
| Service areas | Tag input (add/remove strings) |

**Server Action:** `updateContactInfo`  
**UI pattern:** Single form, "Save Changes", success toast notification.

---

## 6. FORM SUBMISSIONS (READ-ONLY VIEWS)

All 5 submission types follow identical UI patterns. No edit capability — view and delete only.

### Shared Submissions UI Pattern

**List view:** `DataTable` component

- Columns vary by form type (see below)
- Default sort: `createdAt desc` (newest first)
- Row click → detail view in slide-over `<Sheet>` or modal `<Dialog>`
- Search/filter by name or email
- Status badge: `New` (teal) · `Reviewed` (gray)
- [Mark as Reviewed] action · [Delete] action

**Data fetching (SWR):**

```ts
const { data, isLoading } = useSWR('/api/admin/submissions/tours', fetcher);
```

---

### 6.1 Tour Requests (`/admin/submissions/tours`)

**Table columns:**
| Column | Field |
|--------|-------|
| Name | `fullName` |
| Phone | `phone` |
| Email | `email` |
| Resident Name | `residentName` |
| Care Needs | `careNeeds` (truncated) |
| Preferred Date | `preferredDate` |
| Preferred Time | `preferredTime` |
| Status | `status` badge |
| Submitted | `createdAt` |
| Actions | [View] [Delete] |

---

### 6.2 RN Consultation Requests (`/admin/submissions/consultations`)

**Table columns:**
| Column | Field |
|--------|-------|
| Name | `fullName` |
| Phone | `phone` |
| Email | `email` |
| Consultation Type | `consultationType` badge |
| Resident Age | `residentAge` |
| Preferred Date | `preferredDate` |
| Status | `status` badge |
| Submitted | `createdAt` |
| Actions | [View] [Delete] |

---

### 6.3 Referral Submissions (`/admin/submissions/referrals`)

**Table columns:**
| Column | Field |
|--------|-------|
| Referrer Name | `referrerName` |
| Organization | `organization` |
| Phone | `phone` |
| Email | `email` |
| Timeline | `timeline` badge |
| Resident Needs | `residentNeeds` (truncated) |
| Status | `status` badge |
| Submitted | `createdAt` |
| Actions | [View] [Delete] |

---

### 6.4 Career Applications (`/admin/submissions/careers`)

**Table columns:**
| Column | Field |
|--------|-------|
| Name | `fullName` |
| Email | `email` |
| Phone | `phone` |
| Position | `position` |
| Resume | `resumeUrl` → [Download] link |
| Status | `status` badge |
| Submitted | `createdAt` |
| Actions | [View] [Delete] |

---

### 6.5 General Contact (`/admin/submissions/contacts`)

**Table columns:**
| Column | Field |
|--------|-------|
| Name | `fullName` |
| Email | `email` |
| Phone | `phone` |
| Reason | `reason` |
| Message | `message` (truncated) |
| Status | `status` badge |
| Submitted | `createdAt` |
| Actions | [View] [Delete] |

---

## 7. SHARED ADMIN COMPONENTS

### `DataTable.tsx`

Generic table component. Props:

```ts
{
  columns: ColumnDef[]       // column config
  data: Record<string, any>[] // row data
  isLoading: boolean
  onRowClick?: (row) => void
  actions?: ReactNode         // per-row action buttons
}
```

- Loading state: shadcn `<Skeleton>` rows
- Empty state: centered illustration + message
- Built on shadcn `<Table>` primitives
- Pagination: simple prev/next if more than 20 rows

### `ImageUploader.tsx`

```ts
{
  value?: string      // current image src
  onChange: (src: string) => void
  accept?: string     // default: "image/*"
}
```

- Drag-and-drop zone: dashed border, `rounded-2xl`, cloud upload icon
- Preview: shows current image with "Replace" button
- Progress indicator during upload

### `RichTextEditor.tsx`

Minimal rich text for FAQ answers.  
Use a lightweight option: `react-quill` or `@uiw/react-md-editor` (markdown).  
Stores as plain text or markdown string.

### `ConfirmDialog.tsx`

shadcn `<AlertDialog>` wrapper for delete confirmations.

```ts
{
  title: string
  description: string
  onConfirm: () => void
  trigger: ReactNode
}
```

### `StatusBadge.tsx`

```ts
{
  status: 'new' | 'reviewed' | 'pending';
}
```

- `new`: `bg-teal/10 text-teal`
- `reviewed`: `bg-gray-100 text-gray-500`
- `pending`: `bg-amber-100 text-amber-600`

---

## 8. SERVER ACTIONS — ADMIN MUTATIONS

All admin mutations use Next.js Server Actions. Every action follows this pattern:

```ts
'use server';
import { revalidatePath } from 'next/cache';
// import { prisma } from '@/lib/prisma'

export async function updateService(id: string, data: Partial<Service>) {
  // Validate
  const parsed = ServiceSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  // Persist
  // await prisma.service.update({ where: { id }, data: parsed.data })
  console.log('[DEV] updateService:', id, parsed.data);

  // Revalidate
  revalidatePath('/services');
  revalidatePath('/admin/services');

  return { success: true };
}
```

### Complete Server Action Map

| Action File                 | Operations                     | Revalidates                              |
| --------------------------- | ------------------------------ | ---------------------------------------- |
| `updateHeroContent.ts`      | upsert                         | `/`, `/admin/hero`                       |
| `updateService.ts`          | create, update                 | `/services`, `/`, `/admin/services`      |
| `updateGalleryImage.ts`     | create, update                 | `/our-homes`, `/`, `/admin/gallery`      |
| `updateTestimonial.ts`      | create, update, toggle visible | `/`, `/admin/testimonials`               |
| `updateRNPackage.ts`        | update                         | `/rn-consultation`, `/admin/rn-packages` |
| `updateFAQ.ts`              | create, update, toggle visible | `/faq`, `/admin/faq`                     |
| `updateTeamMember.ts`       | create, update                 | `/about`, `/admin/team`                  |
| `updateContactInfo.ts`      | upsert                         | `/contact`, `/`, `/admin/contact-info`   |
| `deleteRecord.ts`           | delete by id + collection      | relevant public + admin paths            |
| `updateSubmissionStatus.ts` | update status field            | `/admin/submissions/[type]`              |

---

## 9. SWR + AXIOS — ADMIN DATA FETCHING

### Admin API Routes

Each admin content domain has two API routes:

```ts
// /app/api/admin/services/route.ts  — GET all
// /app/api/admin/services/[id]/route.ts  — GET single
```

Both serve JSON from `/data/*.json` during dev. Replaced by Prisma in production.

### Admin SWR Hooks (`/hooks/useAdminData.ts`)

```ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetchers';

export function useAdminServices() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/services',
    fetcher
  );
  return { services: data ?? [], error, isLoading, mutate };
}

export function useAdminTestimonials() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/testimonials',
    fetcher
  );
  return { testimonials: data ?? [], error, isLoading, mutate };
}

// Repeat for: gallery, rn-packages, faq, team, contact-info
// Submissions:
export function useAdminSubmissions(
  type: 'tours' | 'consultations' | 'referrals' | 'careers' | 'contacts'
) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/submissions/${type}`,
    fetcher
  );
  return { submissions: data ?? [], error, isLoading, mutate };
}
```

### Mutation Pattern (Server Action + SWR revalidate)

```tsx
// In admin component:
const { services, mutate } = useAdminServices();

async function handleSave(formData: ServiceFormData) {
  setLoading(true);
  const result = await updateService(editingId, formData);
  if (result.success) {
    mutate(); // revalidate SWR cache
    setDialogOpen(false);
    toast.success('Service updated.');
  } else {
    toast.error('Failed to save.');
  }
  setLoading(false);
}
```

---

## 10. PRISMA SCHEMA REFERENCE

The schema below defines the MongoDB collections to build when going live.  
During dev, these models are mirrored exactly by the fake JSON files.

```prisma
// /prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model HeroContent {
  id            String @id @default(auto()) @map("_id") @db.ObjectId
  eyebrow       String
  headline      String
  subheadline   String
  primaryCTA    Json
  secondaryCTA  Json
  heroImage     String
  heroImageAlt  String
  updatedAt     DateTime @updatedAt
}

model Service {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  order       Int
  icon        String
  title       String
  description String
  href        String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model GalleryImage {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  src       String
  alt       String
  room      String
  order     Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Testimonial {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  quote        String
  name         String
  relationship String
  rating       Int
  visible      Boolean  @default(true)
  imageUrl     String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model RNPackage {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  tier     String
  price    Int
  tagline  String
  features String[]
  featured Boolean  @default(false)
  updatedAt DateTime @updatedAt
}

model FAQItem {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  order     Int
  question  String
  answer    String
  visible   Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model TeamMember {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  order     Int
  name      String
  title     String
  bio       String?
  photoUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ContactInfo {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  companyName  String
  email        String
  website      String
  phones       Json
  address      String?
  serviceAreas String[]
  updatedAt    DateTime @updatedAt
}

model TourRequest {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  fullName      String
  phone         String
  email         String
  residentName  String
  relationship  String
  careNeeds     String
  preferredDate String
  preferredTime String
  message       String?
  status        String   @default("new")
  createdAt     DateTime @default(now())
}

model ConsultationRequest {
  id               String   @id @default(auto()) @map("_id") @db.ObjectId
  fullName         String
  phone            String
  email            String
  consultationType String
  residentAge      Int
  careNeeds        String
  preferredDate    String
  message          String?
  status           String   @default("new")
  createdAt        DateTime @default(now())
}

model ReferralSubmission {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  referrerName  String
  organization  String
  phone         String
  email         String
  residentNeeds String
  timeline      String
  notes         String?
  status        String   @default("new")
  createdAt     DateTime @default(now())
}

model CareersApplication {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  fullName  String
  phone     String
  email     String
  position  String
  resumeUrl String
  coverNote String?
  status    String   @default("new")
  createdAt DateTime @default(now())
}

model ContactSubmission {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  fullName  String
  phone     String
  email     String
  reason    String
  message   String
  status    String   @default("new")
  createdAt DateTime @default(now())
}
```

---

## 11. ADMIN UI STANDARDS

### Style Rules

- Admin uses the same Tailwind/shadcn design system as the public site
- Background: `bg-surface-soft` (`#F4F6F8`) for admin page canvas
- Cards/forms: `bg-white rounded-2xl p-6 shadow-card`
- Table: shadcn `<Table>` with `bg-white rounded-2xl overflow-hidden shadow-card`
- Form labels: always `text-sm font-medium text-text-dark`
- Input focus: `focus-visible:ring-teal`

### Toast Notifications

Use shadcn `<Toaster>` + `toast()` for all action feedback:

- Success: `toast.success('Saved successfully.')`
- Error: `toast.error('Something went wrong. Please try again.')`

### Loading States

- Table loading: `<Skeleton>` rows (3 placeholder rows)
- Form submit: `Loader2 animate-spin` inside button
- Image upload: progress bar or spinner overlay

### Empty States

All empty tables/lists must show:

- Centered icon (relevant lucide icon, muted teal)
- Short message: `"No [items] yet."`
- Action button: `"Add First [Item]"`

### Confirmation Dialogs

Every delete action must show `<ConfirmDialog>` before proceeding.  
Never delete on single click.

---

## 12. ADMIN NAVIGATION GROUPS

### Sidebar Sections

**Dashboard**

- Dashboard

**Content Management**

- Hero
- Services
- Gallery
- Testimonials
- RN Packages
- FAQ
- Team
- Contact Info

**Form Submissions**

- Tour Requests
- Consultations
- Referrals
- Career Applications
- Contacts

---

_End of Admin Panel Structure Guide — Capricorn Group Care LLC_  
_Stack: Next.js · SWR + Axios · Server Actions · Prisma · MongoDB Atlas · shadcn/ui_
