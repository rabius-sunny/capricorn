import trustIndicatorsData from '@/data/trust-indicators.json';
import type { TrustIndicator } from '@/types';

export async function getTrustIndicators(): Promise<TrustIndicator[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.trustIndicator.findMany()
  return trustIndicatorsData as TrustIndicator[];
}
