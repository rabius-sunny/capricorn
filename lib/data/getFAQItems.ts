import faqData from '@/data/faq.json';
import type { FAQItem } from '@/types';

export async function getFAQItems(): Promise<FAQItem[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.fAQItem.findMany({ where: { visible: true }, orderBy: { order: 'asc' } })
  return (faqData as FAQItem[])
    .filter((f) => f.visible)
    .sort((a, b) => a.order - b.order);
}
