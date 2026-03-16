import contactInfoData from '@/data/contact-info.json';
import type { ContactInfo } from '@/types';

export async function getContactInfo(): Promise<ContactInfo> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.contactInfo.findFirstOrThrow()
  return contactInfoData as ContactInfo;
}
