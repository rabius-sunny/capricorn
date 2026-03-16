'use server';

import { TourRequestSchema } from '@/lib/validations';
import type { TourRequestInput } from '@/lib/validations';
import type { ActionResult } from '@/types';

export async function submitTourRequest(
  formData: TourRequestInput
): Promise<ActionResult> {
  try {
    const parsed = TourRequestSchema.safeParse(formData);
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
    // await prisma.tourRequest.create({ data: parsed.data })
    console.log('[DEV] Tour request received:', parsed.data);

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { formErrors: ['An unexpected error occurred.'], fieldErrors: {} }
    };
  }
}
