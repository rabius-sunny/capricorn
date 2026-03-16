import { NextResponse } from 'next/server';
import type { Service } from '@/types';
import data from '@/data/services.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.service.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json<Service[]>(data as Service[]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
