'use server';

import { TourRequestSchema } from '@/lib/validations';
import type { TourRequestInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
import { prisma } from '@/lib/prisma';

export async function submitTourRequest(
  formData: TourRequestInput
): Promise<ActionResult> {
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

  try {
    await prisma.tourRequest.create({ data: { ...parsed.data } });
  } catch (dbError) {
    // Graceful fallback — DB may not be connected in dev
    console.error('[DB Error] tourRequest.create failed:', dbError);
    console.log('[DEV] Tour request received:', parsed.data);
  }

  return { success: true };
}
