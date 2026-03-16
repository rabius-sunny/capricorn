'use server';

import { revalidatePath } from 'next/cache';
import { FAQItemSchema, type FAQItemInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateFAQ(
  data: FAQItemInput,
  id?: string
): Promise<ActionResult> {
  const parsed = FAQItemSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    if (id) {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.fAQItem.update({ where: { id }, data: parsed.data })
      console.log('[DEV] updateFAQ (update):', id, parsed.data);
    } else {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.fAQItem.create({ data: parsed.data })
      console.log('[DEV] updateFAQ (create):', parsed.data);
    }
    revalidatePath('/faq');
    revalidatePath('/admin/faq');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
