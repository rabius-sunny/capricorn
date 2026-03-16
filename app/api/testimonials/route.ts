import { NextResponse } from 'next/server';
import data from '@/data/testimonials.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.testimonial.findMany({ where: { visible: true } })
  const visible = (data as { visible: boolean }[]).filter((t) => t.visible);
  return NextResponse.json(visible);
}
