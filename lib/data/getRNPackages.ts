import rnPackagesData from '@/data/rn-packages.json';
import type { RNPackage } from '@/types';

export async function getRNPackages(): Promise<RNPackage[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.rNPackage.findMany()
  return rnPackagesData as RNPackage[];
}
