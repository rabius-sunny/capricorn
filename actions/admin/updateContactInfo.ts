'use server';

import { revalidatePath } from 'next/cache';
import { ContactInfoSchema, type ContactInfoInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateContactInfo(
  data: ContactInfoInput
): Promise<ActionResult> {
  const parsed = ContactInfoSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    // TODO: Persist to MongoDB via Prisma
    // await prisma.contactInfo.upsert({ where: { id: 'singleton' }, update: parsed.data, create: { ...parsed.data, id: 'singleton' } })
    console.log('[DEV] updateContactInfo:', parsed.data);
    revalidatePath('/contact');
    revalidatePath('/');
    revalidatePath('/admin/contact-info');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
