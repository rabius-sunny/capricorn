import { NextResponse } from 'next/server';
import data from '@/data/rn-packages.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.rNPackage.findMany()
  return NextResponse.json(data);
}
