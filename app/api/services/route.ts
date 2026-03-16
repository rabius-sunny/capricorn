import { NextResponse } from 'next/server';
import data from '@/data/services.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(data);
}
