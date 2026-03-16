import galleryData from '@/data/gallery.json';
import type { GalleryImage } from '@/types';

export async function getGalleryImages(): Promise<GalleryImage[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
  return galleryData as GalleryImage[];
}
