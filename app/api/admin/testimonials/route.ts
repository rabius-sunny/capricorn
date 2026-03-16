import { NextResponse } from 'next/server';
import type { Testimonial } from '@/types';
import data from '@/data/testimonials.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.testimonial.findMany()
    return NextResponse.json<Testimonial[]>(data as Testimonial[]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
