'use server';

import { revalidatePath } from 'next/cache';
import { ServiceSchema, type ServiceInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateService(
  data: ServiceInput,
  id?: string
): Promise<ActionResult> {
  const parsed = ServiceSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    if (id) {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.service.update({ where: { id }, data: parsed.data })
      console.log('[DEV] updateService (update):', id, parsed.data);
    } else {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.service.create({ data: parsed.data })
      console.log('[DEV] updateService (create):', parsed.data);
    }
    revalidatePath('/services');
    revalidatePath('/');
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
