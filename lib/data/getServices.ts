import servicesData from '@/data/services.json';
import type { Service } from '@/types';

export async function getServices(): Promise<Service[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return servicesData as Service[];
}
