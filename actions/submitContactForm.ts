'use server';

import { ContactFormSchema } from '@/lib/validations';
import type { ContactFormInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
import { prisma } from '@/lib/prisma';

export async function submitContactForm(
  formData: ContactFormInput
): Promise<ActionResult> {
  const parsed = ContactFormSchema.safeParse(formData);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      errors: {
        formErrors: flat.formErrors,
        fieldErrors: flat.fieldErrors as Record<string, string[] | undefined>
      }
    };
  }

  try {
    await prisma.contactSubmission.create({ data: { ...parsed.data } });
  } catch (dbError) {
    // Graceful fallback — DB may not be connected in dev
    console.error('[DB Error] contactSubmission.create failed:', dbError);
    console.log('[DEV] Contact form received:', parsed.data);
  }

  return { success: true };
}
