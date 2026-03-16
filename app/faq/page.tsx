import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { CTABanner } from '@/components/shared/CTABanner';
import { getFAQItems } from '@/lib/data/getFAQItems';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about residential group home care, our services, RN care planning, and how to get started with Capricorn Group Care.'
};

export default async function FAQPage() {
  const faqItems = await getFAQItems();
  const visibleItems = faqItems.filter((item) => item.visible);

  return (
    <>
      <PageHero
        title='Frequently Asked Questions'
        subtitle='Everything you need to know about residential group care, our services, and how to get started.'
      />

      {/* ── FAQ Accordion ─────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <FAQAccordion items={visibleItems} />
        </div>
      </section>

      {/* ── Still Have Questions ──────────────────────────────────── */}
      <section className='py-16 bg-surface-soft'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl font-heading font-semibold text-text-dark'>
            Still Have Questions?
          </h2>
          <p className='mt-3 text-base text-text-mid leading-relaxed'>
            Our care team is happy to answer any questions you have — by phone,
            email, or in person during a tour.
          </p>
        </div>
      </section>

      <CTABanner
        heading='Ready to Take the Next Step?'
        subtext='Schedule a tour or reach out to our team directly.'
        buttonLabel='Contact Us'
        buttonHref='/contact'
        secondaryButtonLabel='Schedule a Tour'
        secondaryButtonHref='/schedule-a-tour'
      />
    </>
  );
}
