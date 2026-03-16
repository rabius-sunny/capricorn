import Image from 'next/image';
import type { Metadata } from 'next';
import * as LucideIcons from 'lucide-react';

import { PageHero } from '@/components/shared/PageHero';
import { CTABanner } from '@/components/shared/CTABanner';
import { getWhyChooseUs } from '@/lib/data/getWhyChooseUs';

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description:
    'Discover why families in McKinney and Dallas-Fort Worth choose Capricorn Group Care — RN-backed care, home-like environments, and personalized care plans.'
};

const stats = [
  { value: '24/7', label: 'Around-the-clock care support' },
  { value: '2', label: 'Registered nurses on staff' },
  { value: '3', label: 'RN care plan tiers available' },
  { value: 'DFW', label: 'Serving the Dallas-Fort Worth area' }
];

export default async function WhyChooseUsPage() {
  const features = await getWhyChooseUs();

  return (
    <>
      <PageHero
        title='Why Choose Capricorn Care'
        subtitle='A higher standard of residential care — built on clinical expertise, compassion, and a genuine commitment to each resident.'
      />

      {/* ── Feature Rows ──────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28'>
          {features.map((feature, idx) => {
            const IconComponent = (
              LucideIcons as unknown as Record<
                string,
                React.ComponentType<{ className?: string }>
              >
            )[feature.icon];
            const isEven = idx % 2 === 0;

            return (
              <div
                key={feature.id}
                className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
              >
                <div className={isEven ? 'order-1' : 'order-2 lg:order-1'}>
                  {IconComponent && (
                    <div className='inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-teal/10 mb-6'>
                      <IconComponent className='h-7 w-7 text-teal' />
                    </div>
                  )}
                  <h2 className='text-3xl lg:text-4xl font-heading font-semibold text-text-dark leading-tight'>
                    {feature.title}
                  </h2>
                  <p className='mt-4 text-base text-text-mid leading-relaxed max-w-lg'>
                    {feature.description}
                  </p>
                </div>
                <div
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated ${isEven ? 'order-2' : 'order-1 lg:order-2'}`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Stats Row ─────────────────────────────────────────────── */}
      <section className='py-16 bg-gradient-to-r from-teal to-brand-blue'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className='text-4xl font-heading font-semibold text-white'>
                  {stat.value}
                </div>
                <p className='mt-2 text-sm text-white/80 leading-snug'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading='See the Difference for Yourself'
        subtext='Schedule a visit and experience the Capricorn Care difference firsthand.'
        buttonLabel='Schedule a Tour'
        buttonHref='/schedule-a-tour'
        secondaryButtonLabel='Contact Our Team'
        secondaryButtonHref='/contact'
      />
    </>
  );
}
