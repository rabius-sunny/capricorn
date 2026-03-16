import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { CTABanner } from '@/components/shared/CTABanner';
import { getServices } from '@/lib/data/getServices';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore the full range of residential care services offered by Capricorn Group Care LLC — daily living support, medication coordination, RN care planning, and more.'
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        title='Our Care Services'
        subtitle='Comprehensive, personalized support for every aspect of daily living — delivered in the comfort of a residential home.'
      />

      {/* ── Services Grid ─────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Matters ────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl lg:text-4xl font-heading font-semibold text-text-dark leading-tight'>
            Care Tailored to Every Resident
          </h2>
          <p className='mt-6 text-base text-text-mid leading-relaxed'>
            At Capricorn Group Care, we understand that no two residents are
            alike. Our team takes the time to learn each person&apos;s history,
            preferences, and health needs, then builds a care plan around them.
            Whether a resident needs light assistance or more intensive daily
            support, we are here every step of the way.
          </p>
          <p className='mt-4 text-base text-text-mid leading-relaxed'>
            All services are coordinated with RN oversight to ensure clinical
            accuracy, family transparency, and the highest standard of care.
          </p>
        </div>
      </section>

      <CTABanner
        heading='Have Questions About Our Services?'
        subtext="We're happy to walk you through what we offer and help determine the right fit for your loved one."
        buttonLabel='Contact Us'
        buttonHref='/contact'
        secondaryButtonLabel='Schedule a Tour'
        secondaryButtonHref='/schedule-a-tour'
      />
    </>
  );
}
