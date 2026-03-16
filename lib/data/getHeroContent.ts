import heroData from '@/data/hero.json';
import type { HeroContent } from '@/types';

export async function getHeroContent(): Promise<HeroContent> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.heroContent.findFirstOrThrow()
  return heroData as HeroContent;
}
