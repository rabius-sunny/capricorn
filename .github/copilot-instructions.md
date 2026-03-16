# Capricorn Group Care LLC — Copilot Instructions

**Project:** Capricorn Group Care LLC Website + Admin Panel  
**Stack:** Next.js 14 (App Router) · TypeScript · Bun (runtime) · Tailwind CSS · shadcn/ui · Framer Motion · React Hook Form · Zod · SWR · Axios · Next.js Server Actions · Prisma · MongoDB Atlas

---

## 1. PROJECT OVERVIEW

You are assisting in building a full-stack Next.js website for **Capricorn Group Care LLC**, a residential senior care company. The project consists of two parts:

1. **Public Website** — 13 pages serving families, referral partners, and job applicants
2. **Admin Panel** — Protected section under `/admin` for managing all dynamic content and viewing form submissions

### Core Rules to Always Follow

- Use TypeScript everywhere. No `any` types unless absolutely unavoidable — use `unknown` and narrow instead.
- All components use **Tailwind CSS** for styling. No inline styles, no CSS modules.
- All UI primitives come from **shadcn/ui**. Never rebuild things shadcn provides.
- All data flows through typed interfaces defined in `/types/index.ts`.
- Server Components are the default — opt into `'use client'` only when needed.
- Forms use **React Hook Form + Zod** for state/validation, and **Server Actions** for submission.
- Admin data reads use **SWR + Axios**. Public data reads use async Server Component data accessors.
- Never import from `/data/*.json` directly in components — always go through `/lib/data/*.ts` accessors.
- Always run `bun check` for type checking after any task finishes or major code changes.

---

## 2. FILE & FOLDER CONVENTIONS

### Naming

- **Components:** PascalCase — `ServiceCard.tsx`, `HeroSection.tsx`
- **Pages:** lowercase `page.tsx` in route folder — `app/services/page.tsx`
- **Hooks:** camelCase prefixed with `use` — `useSiteData.ts`, `useAdminData.ts`
- **Actions:** camelCase verbs — `submitTourRequest.ts`, `updateService.ts`
- **Types:** PascalCase interfaces — `Service`, `Testimonial`, `FAQItem`
- **Utils/lib:** camelCase — `fetchers.ts`, `validations.ts`
- **JSON data files:** kebab-case — `rn-packages.json`, `contact-info.json`

### Import Order (enforce consistently)

```ts
// 1. React / Next.js core
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import useSWR from 'swr';

// 3. shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// 4. Project components
import { ServiceCard } from '@/components/shared/ServiceCard';

// 5. Types
import type { Service } from '@/types';

// 6. Utils / lib
import { getServices } from '@/lib/data/getServices';
import { fetcher } from '@/lib/fetchers';
```

### Path Aliases

Always use `@/` absolute imports. Never use relative `../../` paths more than one level deep.

---

## 3. COMPONENT RULES

### Server vs Client Components

**Default to Server Components.** Only add `'use client'` when the component:

- Uses React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Uses SWR
- Handles browser events
- Uses Framer Motion animations
- Contains interactive UI (dropdowns, modals, forms)

```tsx
// CORRECT — Server Component (no directive needed)
export default async function ServicesPage() {
  const services = await getServices()
  return <ServiceCard data={services} />
}

// CORRECT — Client Component (interactive)
'use client'
export function GalleryGrid({ initialData }: { initialData: GalleryImage[] }) {
  const [filter, setFilter] = useState('All')
  ...
}
```

### Component Structure Template

```tsx
// ComponentName.tsx
import type { ComponentNameProps } from '@/types';

interface ComponentNameProps {
  // always define props inline or import from /types
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return <section className='...'>{/* content */}</section>;
}
```

### Props

- Always type props explicitly — never use `React.FC<Props>`, use plain function syntax
- Prefer destructured props in function signature
- Use `?` for optional props, always provide sensible fallbacks

---

## 4. STYLING RULES

### Tailwind CSS

- Use design system CSS variables for colors — `text-teal`, `bg-surface-soft`, `shadow-card`
- Use semantic class groups: spacing → typography → color → border → shadow → transition
- Responsive order: mobile-first — `text-base md:text-lg lg:text-xl`
- Avoid arbitrary values `[#abc123]` — use CSS variables or extend `tailwind.config.ts`

### Class Organization Order

```tsx
className="
  // Layout / display
  flex items-center justify-between
  // Sizing
  w-full max-w-6xl
  // Spacing
  px-6 py-4 gap-4
  // Typography
  text-sm font-medium
  // Color
  text-text-mid bg-white
  // Border
  border border-gray-100 rounded-2xl
  // Shadow
  shadow-card
  // Transition
  transition-all duration-300
  // Hover
  hover:shadow-elevated hover:text-teal
"
```

### Never Use

- `style={{}}` inline styles
- Arbitrary breakpoint values
- One-off color hex codes in className
- `!important` overrides

### shadcn/ui Usage

- Always use shadcn primitives for: Button, Input, Textarea, Select, Label, Dialog, Sheet, Accordion, Tabs, Card, Badge, Table, Skeleton, Toast
- Extend shadcn variants via `className` prop, not by modifying component source files
- For custom variants, use the `cva` (class-variance-authority) pattern already inside shadcn components

---

## 5. DATA FETCHING RULES

### Server Components — Data Accessors

```ts
// ALWAYS use data accessors, never import JSON directly
import { getServices } from '@/lib/data/getServices';

// In Server Component page:
const services = await getServices();
```

### Data Accessor Pattern

```ts
// /lib/data/getServices.ts
import servicesData from '@/data/services.json';
import type { Service } from '@/types';

export async function getServices(): Promise<Service[]> {
  // TODO: Replace with Prisma query
  // return await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return servicesData as Service[];
}
```

- Every accessor must be `async` even if currently synchronous — enables drop-in Prisma swap
- Always add the `// TODO: Replace with Prisma query` comment with the actual query

### Client Components — SWR

```ts
// /hooks/useSiteData.ts or useAdminData.ts
export function useServices() {
  const { data, error, isLoading } = useSWR<Service[]>(
    '/api/services',
    fetcher
  );
  return { services: data ?? [], error, isLoading };
}
```

- Always provide a default value (`?? []`) to avoid undefined crashes
- Type the `useSWR` generic — `useSWR<Service[]>`
- SWR is for client components that need reactivity. Don't use it in Server Components.

### API Route Handlers (Dev JSON Shims)

```ts
// /app/api/services/route.ts
import { NextResponse } from 'next/server';
import data from '@/data/services.json';

export async function GET() {
  // TODO: return await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(data);
}
```

- Always include the `// TODO` Prisma comment
- Always type return: `NextResponse.json<Service[]>(data)`

---

## 6. SERVER ACTIONS RULES

### Structure

```ts
// /actions/submitTourRequest.ts
'use server';
import { z } from 'zod';
import { TourRequestSchema } from '@/lib/validations';
// import { prisma } from '@/lib/prisma'

export async function submitTourRequest(
  formData: z.infer<typeof TourRequestSchema>
): Promise<{ success: boolean; errors?: ReturnType<z.ZodError['flatten']> }> {
  const parsed = TourRequestSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  // TODO: await prisma.tourRequest.create({ data: parsed.data })
  console.log('[DEV] Tour request received:', parsed.data);

  return { success: true };
}
```

### Rules

- All Server Actions start with `'use server'` directive
- Always validate with Zod before any database operation
- Always return a typed `{ success: boolean }` object — never throw unhandled errors to client
- Admin mutation actions must call `revalidatePath()` after successful DB write
- Include `// TODO: Prisma` comment showing exact future query

### Using Actions in Forms

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitTourRequest } from '@/actions/submitTourRequest';

export function TourForm() {
  const form = useForm<TourFormData>({
    resolver: zodResolver(TourRequestSchema)
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: TourFormData) {
    startTransition(async () => {
      const result = await submitTourRequest(data);
      if (result.success) {
        // redirect or show success state
      }
    });
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

---

## 7. FORM RULES

### Validation

- All schemas live in `/lib/validations.ts`
- Use Zod for all validation — never manual if/else checks
- All schemas are exported and reused in both client (React Hook Form) and server (Server Action)

```ts
// /lib/validations.ts
import { z } from 'zod';

export const TourRequestSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  residentName: z.string().min(1, 'Resident name is required'),
  relationship: z.string().min(1, 'Please select a relationship'),
  careNeeds: z.string().min(10, 'Please describe care needs'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  message: z.string().optional()
});
```

### Form Component Pattern

```tsx
<Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className='space-y-4'
  >
    <FormField
      control={form.control}
      name='fullName'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input
              placeholder='Jane Smith'
              {...field}
            />
          </FormControl>
          <FormMessage /> {/* Shows Zod error */}
        </FormItem>
      )}
    />
    <Button
      type='submit'
      disabled={isPending}
      className='w-full bg-teal text-white'
    >
      {isPending ? <Loader2 className='animate-spin mr-2 h-4 w-4' /> : null}
      {isPending ? 'Submitting...' : 'Submit'}
    </Button>
  </form>
</Form>
```

---

## 8. TYPESCRIPT RULES

### Type Definitions

All shared types live in `/types/index.ts`. Export named interfaces — no default exports from types file.

```ts
// /types/index.ts

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

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  heroImage: string;
  heroImageAlt: string;
}

// Form submission types
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
```

### Rules

- Never use `any` — use `unknown`, narrow with type guards, or define the type
- Use `interface` for object shapes, `type` for unions/aliases
- Always type async function return values explicitly
- Use `Partial<T>` for update operations, not loose typing

---

## 9. ANIMATION RULES

### Framer Motion Usage

Only use Framer Motion for:

1. Scroll-triggered reveal on sections and cards
2. Stagger animations on grid items
3. Hero content entrance animation

```tsx
// Scroll reveal — use on section wrappers
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  viewport={{ once: true }}
>

// Stagger container
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } }
}
```

### Tailwind-Only Animations (prefer for simple cases)

```tsx
// Hover transitions
className = 'transition-all duration-300 hover:shadow-elevated';
className = 'transition-transform duration-300 hover:scale-105';
className = 'transition-colors duration-150 hover:text-teal';
```

### Do Not

- Don't add heavy animations to every element — use sparingly
- Don't animate on every scroll event — use `viewport={{ once: true }}`
- Don't use Framer Motion for hover states — use Tailwind `hover:` classes instead
- Don't animate admin UI — keep admin interactions clean and fast

---

## 10. IMAGE RULES

Always use `next/image`. Never use `<img>` HTML tags.

```tsx
// Hero image (fixed dimensions)
<Image
  src={hero.heroImage}
  alt={hero.heroImageAlt}
  width={1200}
  height={800}
  priority       // add for above-the-fold images
  className="rounded-3xl object-cover"
/>

// Gallery / card images (fill container)
<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
  <Image
    src={image.src}
    alt={image.alt}
    fill
    className="object-cover hover:scale-105 transition-transform duration-300"
  />
</div>
```

### Rules

- `priority` prop on all hero/above-fold images
- Always provide meaningful `alt` text — never empty, never "image"
- Use `fill` + parent `relative` + `overflow-hidden` for responsive containers
- Add `sizes` prop on `fill` images for performance: `sizes="(max-width: 768px) 100vw, 50vw"`

---

## 11. ERROR HANDLING

### Server Actions

```ts
export async function submitForm(data: FormData): Promise<ActionResult> {
  try {
    const parsed = Schema.safeParse(data);
    if (!parsed.success)
      return { success: false, errors: parsed.error.flatten() };
    // ... operation
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['An unexpected error occurred.'], fieldErrors: {} }
    };
  }
}
```

### API Routes

```ts
export async function GET() {
  try {
    // ... fetch data
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
```

### SWR Error States

Always handle error and loading in SWR hook consumers:

```tsx
const { services, isLoading, error } = useAdminServices();

if (isLoading) return <SkeletonTable />;
if (error) return <ErrorMessage message='Failed to load services.' />;
```

---

## 12. ADMIN PANEL SPECIFIC RULES

### All Admin Pages Are Client Components

Admin pages use SWR for data fetching and have interactive tables/forms — mark as `'use client'`.

### DataTable Pattern

```tsx
// Always show loading state, empty state, and data state
{
  isLoading && <SkeletonRows count={5} />;
}
{
  !isLoading && items.length === 0 && (
    <EmptyState
      label='services'
      action='Add First Service'
    />
  );
}
{
  !isLoading && items.length > 0 && (
    <DataTable
      columns={columns}
      data={items}
    />
  );
}
```

### CRUD Dialog Pattern

Use shadcn `<Dialog>` for create/edit, `<AlertDialog>` (via `ConfirmDialog`) for delete:

```tsx
// Create/Edit
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <ServiceForm
      defaultValues={editing}
      onSave={handleSave}
      onCancel={() => setOpen(false)}
    />
  </DialogContent>
</Dialog>

// Delete
<ConfirmDialog
  title="Delete Service"
  description="This action cannot be undone."
  onConfirm={() => handleDelete(item.id)}
  trigger={<Button variant="destructive" size="sm">Delete</Button>}
/>
```

### Mutation + Revalidation

After every Server Action mutation, always call `mutate()` from the SWR hook to revalidate the local cache:

```tsx
const result = await updateService(id, data);
if (result.success) {
  mutate(); // revalidates SWR cache
  toast.success('Saved.');
}
```

---

## 13. TODO COMMENT CONVENTIONS

Use these exact comment patterns for future integration points:

```ts
// TODO: Replace with Prisma query when DB is connected
// await prisma.service.findMany({ orderBy: { order: 'asc' } })

// TODO: Persist to MongoDB via Prisma
// await prisma.tourRequest.create({ data: parsed.data })

// TODO: Replace JSON shim with Prisma-backed query
// const data = await prisma.testimonial.findMany({ where: { visible: true } })

// TODO: Connect to real cloud storage for image uploads
// const url = await uploadToStorage(file)
```

These comments make it easy to find and replace all dev stubs when going live.

---

## 14. WHAT NOT TO DO

- ❌ Do not use `getServerSideProps` or `getStaticProps` — use App Router patterns
- ❌ Do not use `pages/` directory — everything is in `app/`
- ❌ Do not call Prisma from Client Components — only from Server Actions or API routes
- ❌ Do not use `fetch()` directly in components — use SWR hooks or data accessors
- ❌ Do not import `/data/*.json` directly in components — use `/lib/data/*.ts` accessors
- ❌ Do not use `<img>` tags — always `next/image`
- ❌ Do not hardcode phone numbers or emails in components — pull from `contact-info.json`
- ❌ Do not use inline styles — Tailwind only
- ❌ Do not use arbitrary Tailwind values for brand colors — use CSS variables
- ❌ Do not add `'use client'` to Server Components unless necessary
- ❌ Do not skip Zod validation in Server Actions
- ❌ Do not delete on single click — always use `ConfirmDialog` in admin
- ❌ Do not skip `alt` text on any image

---

## 15. QUICK REFERENCE — KEY PATHS

| What                          | Where                                             |
| ----------------------------- | ------------------------------------------------- |
| All types                     | `/types/index.ts`                                 |
| Zod schemas                   | `/lib/validations.ts`                             |
| Data accessors (Server)       | `/lib/data/*.ts`                                  |
| SWR hooks (Client)            | `/hooks/useSiteData.ts`, `/hooks/useAdminData.ts` |
| Axios instance                | `/lib/axios.ts`                                   |
| SWR fetcher                   | `/lib/fetchers.ts`                                |
| Prisma client                 | `/lib/prisma.ts`                                  |
| Server Actions (public forms) | `/actions/*.ts`                                   |
| Server Actions (admin CRUD)   | `/actions/admin/*.ts`                             |
| Dev JSON data                 | `/data/*.json`                                    |
| Dev API shims                 | `/app/api/*/route.ts`                             |
| shadcn components             | `/components/ui/`                                 |
| Shared page components        | `/components/shared/`                             |
| Admin components              | `/components/admin/`                              |
| Prisma schema                 | `/prisma/schema.prisma`                           |
| Tailwind config               | `tailwind.config.ts`                              |
| Global styles + CSS vars      | `/styles/globals.css`                             |

---

_End of Copilot Instructions — Capricorn Group Care LLC_  
_These instructions apply to the entire project codebase._
