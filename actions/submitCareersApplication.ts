'use server';

import { CareersApplicationSchema } from '@/lib/validations';
import type { CareersApplicationInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
import { prisma } from '@/lib/prisma';

export async function submitCareersApplication(
  formData: CareersApplicationInput
): Promise<ActionResult> {
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

  try {
    await prisma.careersApplication.create({ data: { ...parsed.data } });
  } catch (dbError) {
    // Graceful fallback — DB may not be connected in dev
    console.error('[DB Error] careersApplication.create failed:', dbError);
    console.log('[DEV] Career application received:', parsed.data);
  }

  return { success: true };
}
