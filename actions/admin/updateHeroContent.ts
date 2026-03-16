'use server';

import { revalidatePath } from 'next/cache';
import { HeroContentSchema, type HeroContentInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateHeroContent(
  data: HeroContentInput
): Promise<ActionResult> {
  const parsed = HeroContentSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    // TODO: Persist to MongoDB via Prisma
    // await prisma.heroContent.upsert({ where: { id: 'singleton' }, update: parsed.data, create: { ...parsed.data, id: 'singleton' } })
    console.log('[DEV] updateHeroContent:', parsed.data);
    revalidatePath('/');
    revalidatePath('/admin/hero');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
