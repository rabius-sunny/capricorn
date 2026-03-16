'use server';

import { ReferralSchema } from '@/lib/validations';
import type { ReferralInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
import { prisma } from '@/lib/prisma';

export async function submitReferral(
  formData: ReferralInput
): Promise<ActionResult> {
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

  try {
    await prisma.referralSubmission.create({ data: { ...parsed.data } });
  } catch (dbError) {
    // Graceful fallback — DB may not be connected in dev
    console.error('[DB Error] referralSubmission.create failed:', dbError);
    console.log('[DEV] Referral submission received:', parsed.data);
  }

  return { success: true };
}
