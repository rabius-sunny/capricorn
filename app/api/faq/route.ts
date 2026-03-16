import { NextResponse } from 'next/server';
import data from '@/data/faq.json';

export async function GET() {
  // TODO: Replace JSON shim with Prisma-backed query
  // const data = await prisma.fAQItem.findMany({ where: { visible: true }, orderBy: { order: 'asc' } })
  const visible = (data as { visible: boolean; order: number }[])
    .filter((f) => f.visible)
    .sort((a, b) => a.order - b.order);
  return NextResponse.json(visible);
}
