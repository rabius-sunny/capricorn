import { NextResponse } from 'next/server';
import data from '@/data/team.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  const sorted = (data as { order: number }[]).sort(
    (a, b) => a.order - b.order
  );
  return NextResponse.json(sorted);
}
