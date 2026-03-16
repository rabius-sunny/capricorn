'use server';

import { revalidatePath } from 'next/cache';
import type { ActionResult, SubmissionType } from '@/types';
// import { prisma } from '@/lib/prisma';

const modelMap: Record<SubmissionType, string> = {
  tours: 'tourRequest',
  consultations: 'consultationRequest',
  referrals: 'referralSubmission',
  careers: 'careersApplication',
  contacts: 'contactSubmission'
};

export async function updateSubmissionStatus(
  id: string,
  type: SubmissionType,
  status: 'new' | 'reviewed'
): Promise<ActionResult> {
  try {
    // TODO: Persist to MongoDB via Prisma
    // await (prisma[modelMap[type]] as any).update({ where: { id }, data: { status } })
    console.log('[DEV] updateSubmissionStatus:', type, id, status);
    revalidatePath(`/admin/submissions/${type}`);
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to update status.'], fieldErrors: {} }
    };
  }
}
