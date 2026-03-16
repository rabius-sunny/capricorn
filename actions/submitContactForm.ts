'use server';

import { ContactFormSchema } from '@/lib/validations';
import type { ContactFormInput } from '@/lib/validations';
import type { ActionResult } from '@/types';

export async function submitContactForm(
  formData: ContactFormInput
): Promise<ActionResult> {
  try {
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

    // TODO: Persist to MongoDB via Prisma
    // await prisma.contactSubmission.create({ data: parsed.data })
    console.log('[DEV] Contact form received:', parsed.data);

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { formErrors: ['An unexpected error occurred.'], fieldErrors: {} }
    };
  }
}
