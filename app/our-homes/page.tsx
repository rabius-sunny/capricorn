import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { GalleryGrid } from '@/components/shared/GalleryGrid';
import { CTABanner } from '@/components/shared/CTABanner';
import { getGalleryImages } from '@/lib/data/getGalleryImages';

export const metadata: Metadata = {
  title: 'Our Homes',
  description:
    'Take a look inside the Capricorn Group Care homes — warm, accessible residential spaces designed for comfort, safety, and daily living.'
};

export default async function OurHomesPage() {
  const gallery = await getGalleryImages();

  return (
    <>
      <PageHero
        title='Our Homes'
        subtitle='Safe, warm, and comfortable residential spaces — designed to feel like home, not a facility.'
      />

      {/* ── Gallery ───────────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <GalleryGrid initialData={gallery} />
        </div>
      </section>

      {/* ── Home Features ─────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl lg:text-4xl font-heading font-semibold text-text-dark'>
            Designed for Safety, Built for Comfort
          </h2>
          <p className='mt-6 text-base text-text-mid leading-relaxed'>
            Our residential homes feature wide hallways, grab bars, accessible
            bathrooms, non-slip flooring, and thoughtfully arranged living
            spaces that reduce fall risks and support confident daily movement.
            Every detail is chosen with our residents&apos; safety and comfort
            in mind.
          </p>
          <p className='mt-4 text-base text-text-mid leading-relaxed'>
            Beyond safety, our homes feel genuinely warm and personal. Residents
            share meals, enjoy comfortable living areas, and build lasting
            relationships with their caregivers and fellow residents.
          </p>
        </div>
      </section>

      <CTABanner
        heading='See Our Homes in Person'
        subtext='Schedule a tour and visit our residential spaces. We would love to show you around.'
        buttonLabel='Schedule a Tour'
        buttonHref='/schedule-a-tour'
      />
    </>
  );
}
