'use server';

import { revalidatePath } from 'next/cache';
import { RNPackageSchema, type RNPackageInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateRNPackage(
  data: RNPackageInput,
  id: string
): Promise<ActionResult> {
  const parsed = RNPackageSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    // TODO: Persist to MongoDB via Prisma
    // await prisma.rNPackage.update({ where: { id }, data: parsed.data })
    console.log('[DEV] updateRNPackage (update):', id, parsed.data);
    revalidatePath('/rn-consultation');
    revalidatePath('/admin/rn-packages');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
