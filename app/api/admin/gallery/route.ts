import { NextResponse } from 'next/server';
import type { GalleryImage } from '@/types';
import data from '@/data/gallery.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json<GalleryImage[]>(data as GalleryImage[]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
