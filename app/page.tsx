import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { buttonVariants } from '@/lib/button-variants';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { RNPricingCard } from '@/components/shared/RNPricingCard';
import { TrustBadge } from '@/components/shared/TrustBadge';
import { CTABanner } from '@/components/shared/CTABanner';
import { getHeroContent } from '@/lib/data/getHeroContent';
import { getServices } from '@/lib/data/getServices';
import { getGalleryImages } from '@/lib/data/getGalleryImages';
import { getTestimonials } from '@/lib/data/getTestimonials';
import { getRNPackages } from '@/lib/data/getRNPackages';
import { getTrustIndicators } from '@/lib/data/getTrustIndicators';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Compassionate Residential Senior Care in McKinney & DFW',
  description:
    'Capricorn Group Care LLC provides safe, supportive residential care for seniors and adults in McKinney, Plano, Frisco, and throughout Dallas-Fort Worth.'
};

export default async function HomePage() {
  const [hero, services, gallery, testimonials, rnPackages, trust] =
    await Promise.all([
      getHeroContent(),
      getServices(),
      getGalleryImages(),
      getTestimonials(),
      getRNPackages(),
      getTrustIndicators()
    ]);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className='relative min-h-[90vh] flex items-center bg-gradient-to-br from-teal/10 via-white to-brand-blue/5 overflow-hidden'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            <div>
              <span className='inline-block px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-semibold tracking-wide uppercase mb-6'>
                {hero.eyebrow}
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-dark leading-tight'>
                {hero.headline}
              </h1>
              <p className='mt-6 text-lg text-text-mid leading-relaxed max-w-lg'>
                {hero.subheadline}
              </p>
              <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                <Link
                  href={hero.primaryCTA.href}
                  className={cn(
                    buttonVariants(),
                    'bg-teal text-white hover:bg-teal-dark rounded-xl px-8 py-3.5 h-auto font-semibold text-base'
                  )}
                >
                  {hero.primaryCTA.label}
                </Link>
                <Link
                  href={hero.secondaryCTA.href}
                  className='inline-flex items-center justify-center border border-teal text-teal rounded-xl px-8 py-3.5 font-semibold text-base hover:bg-teal/5 transition-colors'
                >
                  {hero.secondaryCTA.label}
                </Link>
              </div>
            </div>
            <div className='relative aspect-[5/4] rounded-3xl overflow-hidden shadow-elevated'>
              <Image
                src={hero.heroImage}
                alt={hero.heroImageAlt}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Indicators ──────────────────────────────────────── */}
      <section className='py-10 bg-white border-y border-gray-100'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {trust.map((item) => (
              <TrustBadge
                key={item.id}
                icon={item.icon}
                label={item.label}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Welcome Section ───────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card order-2 lg:order-1'>
              <Image
                src='https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=720&h=540&auto=format&fit=crop&q=80'
                alt='Capricorn Care home interior'
                fill
                className='object-cover'
              />
            </div>
            <div className='order-1 lg:order-2'>
              <span className='inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold tracking-wider uppercase mb-4'>
                Welcome
              </span>
              <h2 className='text-3xl lg:text-4xl font-heading font-semibold text-text-dark leading-tight'>
                A Home for Those You Love
              </h2>
              <p className='mt-4 text-base text-text-mid leading-relaxed'>
                At Capricorn Group Care, we believe every person deserves to
                receive care in a warm, home-like environment. Our residences
                feel like family homes — not clinical facilities — where each
                resident is treated with dignity, compassion, and respect.
              </p>
              <p className='mt-3 text-base text-text-mid leading-relaxed'>
                Serving McKinney, Plano, Frisco, and communities throughout the
                Dallas-Fort Worth area, our certified care staff provide
                round-the-clock support while maintaining the comforts of home.
              </p>
              <Link
                href='/about'
                className='inline-flex items-center mt-6 text-teal font-semibold hover:text-teal-dark transition-colors'
              >
                Learn About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Home Environment Showcase ─────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Our Homes'
            title='Comfortable, Safe Residential Spaces'
            subtitle='Every room is thoughtfully designed for safety, comfort, and daily living.'
            align='center'
          />
          <div className='mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {gallery.slice(0, 3).map((img) => (
              <div
                key={img.id}
                className='group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card'
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <div className='absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
                  <span className='text-white text-sm font-medium'>
                    {img.room}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8 text-center'>
            <Link
              href='/our-homes'
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-xl px-6 py-2.5 h-auto'
              )}
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Our Services'
            title='Comprehensive Care for Every Need'
            subtitle='Personalized support for daily living, medication coordination, companionship, and more.'
            align='center'
          />
          <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
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
          <div className='mt-10 text-center'>
            <Link
              href='/services'
              className={cn(
                buttonVariants(),
                'bg-teal text-white hover:bg-teal-dark rounded-xl px-8 py-3 h-auto font-semibold'
              )}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── RN Consultation Highlight ─────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-gradient-to-br from-brand-purple/10 to-teal/10'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            <div className='lg:sticky lg:top-24'>
              <div className='flex flex-wrap gap-2 mb-6'>
                {rnPackages.map((pkg) => (
                  <span
                    key={pkg.id}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      pkg.featured
                        ? 'bg-teal text-white'
                        : 'bg-teal/10 text-teal'
                    )}
                  >
                    {pkg.tier}
                  </span>
                ))}
              </div>
              <SectionHeader
                label='RN Care Planning'
                title='Professional Care Plan Consultation'
                subtitle='Our registered nurse consultants help families and residential providers develop comprehensive, individualized care plans backed by clinical expertise.'
                align='left'
              />
              <Link
                href='/rn-consultation'
                className={cn(
                  buttonVariants(),
                  'mt-8 bg-teal text-white hover:bg-teal-dark rounded-xl px-8 py-3 h-auto font-semibold'
                )}
              >
                Explore RN Services
              </Link>
            </div>
            <div className='flex flex-col gap-8 lg:pt-2'>
              {rnPackages.slice(0, 2).map((pkg) => (
                <RNPricingCard
                  key={pkg.id}
                  {...pkg}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Testimonials'
            title='What Families & Partners Say'
            align='center'
          />
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                name={t.name}
                relationship={t.relationship}
                rating={t.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ───────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Gallery'
            title='A Look Inside Our Homes'
            align='center'
          />
          <div className='mt-12 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {gallery.slice(0, 6).map((img) => (
              <div
                key={img.id}
                className='group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card'
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>
            ))}
          </div>
          <div className='mt-8 text-center'>
            <Link
              href='/our-homes'
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-xl px-6 py-2.5 h-auto'
              )}
            >
              See Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <CTABanner
        heading='Ready to Find the Right Care?'
        subtext='Schedule a tour today and see why families across Dallas-Fort Worth choose Capricorn Group Care.'
        buttonLabel='Schedule a Tour'
        buttonHref='/schedule-a-tour'
        secondaryButtonLabel='Contact Us'
        secondaryButtonHref='/contact'
      />
    </>
  );
}
