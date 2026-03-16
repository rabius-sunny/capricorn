'use server';

import { CareersApplicationSchema } from '@/lib/validations';
import type { CareersApplicationInput } from '@/lib/validations';
import type { ActionResult } from '@/types';

export async function submitCareersApplication(
  formData: CareersApplicationInput
): Promise<ActionResult> {
  try {
    const parsed = CareersApplicationSchema.safeParse(formData);
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
    // await prisma.careersApplication.create({ data: parsed.data })
    console.log('[DEV] Career application received:', parsed.data);

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { formErrors: ['An unexpected error occurred.'], fieldErrors: {} }
    };
  }
}
