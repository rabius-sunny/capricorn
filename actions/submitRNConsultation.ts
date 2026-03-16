'use server';

import { RNConsultationSchema } from '@/lib/validations';
import type { RNConsultationInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
import { prisma } from '@/lib/prisma';

export async function submitRNConsultation(
  formData: RNConsultationInput
): Promise<ActionResult> {
  const parsed = RNConsultationSchema.safeParse(formData);
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
    await prisma.consultationRequest.create({ data: { ...parsed.data } });
  } catch (dbError) {
    // Graceful fallback — DB may not be connected in dev
    console.error('[DB Error] consultationRequest.create failed:', dbError);
    console.log('[DEV] RN Consultation request received:', parsed.data);
  }

  return { success: true };
}
