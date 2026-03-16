import Link from 'next/link';
import {
  Phone,
  Mail,
  ClipboardList,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ReferralForm } from '@/components/forms/ReferralForm';
import { getContactInfo } from '@/lib/data/getContactInfo';

export const metadata: Metadata = {
  title: 'Referral Partners',
  description:
    'Refer patients to Capricorn Group Care LLC. We work closely with hospitals, discharge planners, case managers, and healthcare providers across the Dallas-Fort Worth area.'
};

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Submit a Referral',
    description:
      "Fill out our referral form with the patient's care needs, condition, and discharge timeline."
  },
  {
    icon: UserCheck,
    step: '02',
    title: 'We Review & Respond',
    description:
      'Our RN team will review the referral and respond within one business day to confirm fit and availability.'
  },
  {
    icon: ArrowRight,
    step: '03',
    title: 'Smooth Transition',
    description:
      'We coordinate closely with your team to ensure a safe, well-planned transition into our care.'
  }
];

export default async function ReferralPartnersPage() {
  const contactInfo = await getContactInfo();

  return (
    <>
      <PageHero
        title='Referral Partners'
        subtitle='We work with hospitals, discharge planners, case managers, and healthcare providers to ensure smooth, safe transitions into residential care.'
      />

      {/* ── Intro Block ───────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <SectionHeader
            label='For Healthcare Professionals'
            title='A Trusted Partner for Care Transitions'
            subtitle='Capricorn Group Care is a reliable placement option for patients transitioning from acute care, skilled nursing, or home settings into residential group care. We communicate proactively with referring providers and prioritize smooth, safe admissions.'
            align='center'
          />
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-surface-soft'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <SectionHeader
            label='Our Process'
            title='How the Referral Process Works'
            align='center'
          />
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
            {steps.map(({ icon: Icon, step, title, description }) => (
              <div
                key={step}
                className='bg-white rounded-2xl p-8 shadow-card text-center'
              >
                <div className='inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-teal/10 mb-4'>
                  <Icon className='h-7 w-7 text-teal' />
                </div>
                <div className='text-xs font-semibold text-teal tracking-widest uppercase mb-2'>
                  Step {step}
                </div>
                <h3 className='font-semibold text-text-dark mb-3'>{title}</h3>
                <p className='text-sm text-text-mid leading-relaxed'>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Referral Form ─────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div>
              <SectionHeader
                label='Direct Line'
                title='Contact Our Referral Team'
                subtitle='Prefer a direct conversation? Reach our RN team by phone or email.'
                align='left'
              />
              <div className='mt-8 space-y-4'>
                {contactInfo.phones.map((phone) => (
                  <a
                    key={phone.name}
                    href={`tel:${phone.number.replace(/[^0-9+]/g, '')}`}
                    className='flex items-center gap-3 text-teal hover:text-teal-dark font-medium transition-colors'
                  >
                    <Phone className='h-5 w-5 shrink-0' />
                    <span>
                      {phone.name}: {phone.number}
                    </span>
                  </a>
                ))}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className='flex items-center gap-3 text-teal hover:text-teal-dark font-medium transition-colors'
                >
                  <Mail className='h-5 w-5 shrink-0' />
                  <span>{contactInfo.email}</span>
                </a>
              </div>

              <div className='mt-8 p-6 bg-surface-soft rounded-2xl'>
                <h3 className='font-semibold text-text-dark mb-2'>
                  Service Areas
                </h3>
                <p className='text-sm text-text-mid'>
                  {contactInfo.serviceAreas.join(' · ')}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className='bg-surface-soft rounded-2xl p-8 shadow-card'>
              <h2 className='text-2xl font-heading font-semibold text-text-dark mb-6'>
                Submit a Referral
              </h2>
              <ReferralForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
