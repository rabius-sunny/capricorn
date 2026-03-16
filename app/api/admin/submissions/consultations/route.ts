import { NextResponse } from 'next/server';
import type { ConsultationRequest } from '@/types';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const items = await prisma.consultationRequest.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json<ConsultationRequest[]>([]);
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load submissions.' },
      { status: 500 }
    );
  }
}
