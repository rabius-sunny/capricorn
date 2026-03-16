import { NextResponse } from 'next/server';
import type { FAQItem } from '@/types';
import data from '@/data/faq.json';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.fAQItem.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json<FAQItem[]>(data as FAQItem[]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load data.' },
      { status: 500 }
    );
  }
}
