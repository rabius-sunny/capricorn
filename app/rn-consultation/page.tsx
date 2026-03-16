import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { RNPricingCard } from '@/components/shared/RNPricingCard';
import { RNConsultationForm } from '@/components/forms/RNConsultationForm';
import { getRNPackages } from '@/lib/data/getRNPackages';
import { getContactInfo } from '@/lib/data/getContactInfo';

export const metadata: Metadata = {
  title: 'RN Care Plan Consultation',
  description:
    'Professional RN care plan consultation services for families and residential care providers. Three tiers available — Starter, Essential, and Comprehensive.'
};

export default async function RNConsultationPage() {
  const [packages, contactInfo] = await Promise.all([
    getRNPackages(),
    getContactInfo()
  ]);

  return (
    <>
      <PageHero
        title='RN Care Plan Consultation'
        subtitle='Registered nurse-led care planning for families and residential providers — clinical expertise, personalized to your needs.'
      />

      {/* ── RN Introduction ───────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <SectionHeader
            label='What We Offer'
            title='Expert Care Planning From Registered Nurses'
            subtitle='Our RN consultation services provide structured, clinically sound care plans for families navigating complex care decisions, and for residential providers seeking compliance and quality guidance.'
            align='center'
          />
          <p className='mt-6 text-base text-text-mid leading-relaxed'>
            Whether you are a family member new to the process or an experienced
            care provider, our nurses translate clinical complexity into clear,
            actionable care plans — so you can make confident decisions.
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────── */}
      <section
        id='plans'
        className='py-20 lg:py-28 bg-surface-soft'
      >
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Our Plans'
            title='Choose the Right Level of Support'
            align='center'
          />
          <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
            {packages.map((pkg) => (
              <RNPricingCard
                key={pkg.id}
                {...pkg}
                ctaHref='#request'
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Block ─────────────────────────────────────────── */}
      <section className='py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-surface-soft rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold text-text-dark text-lg mb-4'>
                Reach Our RN Team Directly
              </h3>
              <div className='space-y-3'>
                {contactInfo.phones.map((phone) => (
                  <a
                    key={phone.name}
                    href={`tel:${phone.number.replace(/[^0-9+]/g, '')}`}
                    className='flex items-center gap-3 text-teal hover:text-teal-dark font-medium transition-colors text-sm'
                  >
                    <Phone className='h-4 w-4 shrink-0' />
                    {phone.name}: {phone.number}
                  </a>
                ))}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className='flex items-center gap-3 text-teal hover:text-teal-dark font-medium transition-colors text-sm'
                >
                  <Mail className='h-4 w-4 shrink-0' />
                  {contactInfo.email}
                </a>
              </div>
            </div>
            <div>
              <h3 className='font-semibold text-text-dark text-lg mb-2'>
                Questions About Our Services?
              </h3>
              <p className='text-sm text-text-mid leading-relaxed'>
                Our nurses are happy to answer questions about the consultation
                process, what each tier includes, and how we can best support
                your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation Form ─────────────────────────────────────── */}
      <section
        id='request'
        className='py-20 lg:py-28 bg-surface-soft'
      >
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Request a Consultation'
            title='Schedule Your RN Consultation'
            subtitle='Fill out the form below and our team will follow up within one business day.'
            align='center'
          />
          <div className='mt-10 bg-white rounded-2xl p-8 shadow-card'>
            <RNConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
