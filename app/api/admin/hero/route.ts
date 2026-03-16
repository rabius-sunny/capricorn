import { NextResponse } from 'next/server';
import type { HeroContent } from '@/types';
import data from '@/data/hero.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const item = await prisma.heroContent.findFirst()
    return NextResponse.json<HeroContent>(data as HeroContent);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
