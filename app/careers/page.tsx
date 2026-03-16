import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { CareersForm } from '@/components/forms/CareersForm';
import { CTABanner } from '@/components/shared/CTABanner';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Capricorn Group Care team. We are hiring compassionate caregivers, CNAs, medication technicians, and registered nurses in the Dallas-Fort Worth area.'
};

const openings = [
  'Caregiver / Direct Care Staff',
  'Medication Technician',
  'Certified Nursing Assistant (CNA)',
  'Registered Nurse (RN)',
  'Licensed Practical Nurse (LPN)',
  'Care Coordinator'
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title='Join Our Care Team'
        subtitle='We are always looking for compassionate, dedicated individuals who believe in person-centered care.'
      />

      {/* ── Culture Block ─────────────────────────────────────────── */}
      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            <div>
              <h2 className='text-3xl font-heading font-semibold text-text-dark leading-tight mb-6'>
                Work Where Care Matters
              </h2>
              <div className='space-y-4 text-base text-text-mid leading-relaxed'>
                <p>
                  At Capricorn Group Care, our staff are more than employees —
                  they are the heart of our homes. We believe that when our team
                  feels supported, respected, and valued, that care naturally
                  extends to every resident.
                </p>
                <p>
                  We offer a collaborative, family-oriented work environment
                  where your contributions are recognized and your professional
                  growth is supported. Whether you are an experienced registered
                  nurse or someone just beginning a career in care, there is a
                  place for you here.
                </p>
              </div>

              <div className='mt-8'>
                <h3 className='font-semibold text-text-dark mb-4'>
                  Current Openings
                </h3>
                <ul className='space-y-2'>
                  {openings.map((role) => (
                    <li
                      key={role}
                      className='flex items-center gap-2 text-sm text-text-mid'
                    >
                      <span className='h-1.5 w-1.5 rounded-full bg-teal shrink-0' />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className='bg-surface-soft rounded-2xl p-8 shadow-card'>
              <h2 className='text-2xl font-heading font-semibold text-text-dark mb-6'>
                Apply Now
              </h2>
              <CareersForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
