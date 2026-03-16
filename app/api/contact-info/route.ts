import { NextResponse } from 'next/server';
import data from '@/data/contact-info.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.contactInfo.findFirstOrThrow()
  return NextResponse.json(data);
}
