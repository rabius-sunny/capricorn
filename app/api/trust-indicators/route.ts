import { NextResponse } from 'next/server';
import data from '@/data/trust-indicators.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.trustIndicator.findMany()
  return NextResponse.json(data);
}
