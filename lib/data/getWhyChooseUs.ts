import whyData from '@/data/why-choose-us.json';
import type { WhyChooseUsFeature } from '@/types';

export async function getWhyChooseUs(): Promise<WhyChooseUsFeature[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.whyChooseUsFeature.findMany({ orderBy: { order: 'asc' } })
  return (whyData as WhyChooseUsFeature[]).sort((a, b) => a.order - b.order);
}
