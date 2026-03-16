import { NextResponse } from 'next/server';
import data from '@/data/gallery.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(data);
}
