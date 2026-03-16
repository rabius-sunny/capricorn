'use server';

import { ReferralSchema } from '@/lib/validations';
import type { ReferralInput } from '@/lib/validations';
import type { ActionResult } from '@/types';

export async function submitReferral(
  formData: ReferralInput
): Promise<ActionResult> {
  try {
    const parsed = ReferralSchema.safeParse(formData);
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
    // await prisma.referralSubmission.create({ data: parsed.data })
    console.log('[DEV] Referral submission received:', parsed.data);

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { formErrors: ['An unexpected error occurred.'], fieldErrors: {} }
    };
  }
}
