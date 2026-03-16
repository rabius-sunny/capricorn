import { NextResponse } from 'next/server';
import type { ContactInfo } from '@/types';
import data from '@/data/contact-info.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const item = await prisma.contactInfo.findFirst()
    return NextResponse.json<ContactInfo>(data as ContactInfo);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
