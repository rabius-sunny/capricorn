'use server';

import { revalidatePath } from 'next/cache';
import { TestimonialSchema, type TestimonialInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateTestimonial(
  data: TestimonialInput,
  id?: string
): Promise<ActionResult> {
  const parsed = TestimonialSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    if (id) {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.testimonial.update({ where: { id }, data: parsed.data })
      console.log('[DEV] updateTestimonial (update):', id, parsed.data);
    } else {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.testimonial.create({ data: parsed.data })
      console.log('[DEV] updateTestimonial (create):', parsed.data);
    }
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
