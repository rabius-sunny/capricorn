'use server';

import { revalidatePath } from 'next/cache';
import { GalleryImageSchema, type GalleryImageInput } from '@/lib/validations';
import type { ActionResult } from '@/types';
// import { prisma } from '@/lib/prisma';

export async function updateGalleryImage(
  data: GalleryImageInput,
  id?: string
): Promise<ActionResult> {
  const parsed = GalleryImageSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten() };

  try {
    if (id) {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.galleryImage.update({ where: { id }, data: parsed.data })
      console.log('[DEV] updateGalleryImage (update):', id, parsed.data);
    } else {
      // TODO: Persist to MongoDB via Prisma
      // await prisma.galleryImage.create({ data: parsed.data })
      console.log('[DEV] updateGalleryImage (create):', parsed.data);
    }
    revalidatePath('/our-homes');
    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('[Action Error]', error);
    return {
      success: false,
      errors: { formErrors: ['Failed to save.'], fieldErrors: {} }
    };
  }
}
