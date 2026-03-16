import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const count = await prisma.consultationRequest.count()
    return NextResponse.json({ count: 0 });
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { error: 'Failed to load count.' },
      { status: 500 }
    );
  }
}
