'use server';

import { RNConsultationSchema } from '@/lib/validations';
import type { RNConsultationInput } from '@/lib/validations';
import type { ActionResult } from '@/types';

export async function submitRNConsultation(
  formData: RNConsultationInput
): Promise<ActionResult> {
  try {
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

    // TODO: Persist to MongoDB via Prisma
    // await prisma.consultationRequest.create({ data: parsed.data })
    console.log('[DEV] RN Consultation request received:', parsed.data);

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { formErrors: ['An unexpected error occurred.'], fieldErrors: {} }
    };
  }
}
