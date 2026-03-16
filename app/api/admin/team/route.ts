import { NextResponse } from 'next/server';
import type { TeamMember } from '@/types';
import data from '@/data/team.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json<TeamMember[]>(data as TeamMember[]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
