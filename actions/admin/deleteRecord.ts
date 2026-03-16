'use server';

import { revalidatePath } from 'next/cache';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

type Collection =
  | 'service'
  | 'galleryImage'
  | 'testimonial'
  | 'faqItem'
  | 'teamMember'
  | 'tourRequest'
  | 'consultationRequest'
  | 'referralSubmission'
  | 'careersApplication'
  | 'contactSubmission';

export async function deleteRecord(
  id: string,
  collection: Collection
): Promise<ActionResult> {
  try {
    // TODO: Persist to MongoDB via Prisma
    // await (prisma[collection] as any).delete({ where: { id } })
    console.log('[DEV] deleteRecord:', collection, id);

    const pathMap: Record<Collection, string[]> = {
      service: ['/services', '/', '/admin/services'],
      galleryImage: ['/our-homes', '/', '/admin/gallery'],
      testimonial: ['/', '/admin/testimonials'],
      faqItem: ['/faq', '/admin/faq'],
      teamMember: ['/about', '/admin/team'],
      tourRequest: ['/admin/submissions/tours'],
      consultationRequest: ['/admin/submissions/consultations'],
      referralSubmission: ['/admin/submissions/referrals'],
      careersApplication: ['/admin/submissions/careers'],
      contactSubmission: ['/admin/submissions/contacts']
    };

    pathMap[collection].forEach((path) => revalidatePath(path));
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to delete.'], fieldErrors: {} }
    };
  }
}
