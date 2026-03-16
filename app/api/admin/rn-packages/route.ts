import { NextResponse } from 'next/server';
import type { RNPackage } from '@/types';
import data from '@/data/rn-packages.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.rNPackage.findMany()
    return NextResponse.json<RNPackage[]>(data as RNPackage[]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
