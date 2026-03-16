import { NextResponse } from 'next/server';
import type { CareersApplication } from '@/types';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.careersApplication.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json<CareersApplication[]>([]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load submissions.' },
      { status: 500 }
    );
  }
}
