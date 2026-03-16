import Link from 'next/link';
import { Phone, Calendar, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { TourForm } from '@/components/forms/TourForm';
import { getContactInfo } from '@/lib/data/getContactInfo';

export const metadata: Metadata = {
  title: 'Schedule a Tour',
  description:
    'Schedule a tour of a Capricorn Group Care home. Come see our residential spaces, meet our team, and find the right fit for your loved one.'
};

const tourBenefits = [
  {
    icon: HeartHandshake,
    title: 'Meet Our Care Team',
    description:
      'Get to know the nurses and caregivers who will support your loved one.'
  },
  {
    icon: Calendar,
    title: 'See the Spaces',
    description: 'Walk through the bedrooms, common areas, and outdoor spaces.'
  },
  {
    icon: Phone,
    title: 'Ask Your Questions',
    description:
      'Bring your questions — our team will walk you through every detail.'
  }
];

export default async function ScheduleATourPage() {
  const contactInfo = await getContactInfo();

  return (
    <>
      <PageHero
        title='Schedule a Tour'
        subtitle='Come see our homes in person. Tours are offered seven days a week at a time that works for you.'
      />

      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Tour Info */}
            <div>
              <h2 className='text-2xl font-heading font-semibold text-text-dark mb-8'>
                What to Expect
              </h2>
              <div className='space-y-6'>
                {tourBenefits.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className='flex items-start gap-4'
                  >
                    <div className='inline-flex items-center justify-center h-10 w-10 rounded-xl bg-teal/10 shrink-0'>
                      <Icon className='h-5 w-5 text-teal' />
                    </div>
                    <div>
                      <p className='font-semibold text-text-dark'>{title}</p>
                      <p className='text-sm text-text-mid mt-1 leading-relaxed'>
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Fallback */}
              <div className='mt-10 p-6 bg-surface-soft rounded-2xl'>
                <h3 className='font-semibold text-text-dark mb-3'>
                  Prefer to call?
                </h3>
                <div className='space-y-2'>
                  {contactInfo.phones.map((phone) => (
                    <a
                      key={phone.name}
                      href={`tel:${phone.number.replace(/[^0-9+]/g, '')}`}
                      className='flex items-center gap-2 text-teal hover:text-teal-dark font-medium transition-colors text-sm'
                    >
                      <Phone className='h-4 w-4 shrink-0' />
                      {phone.name}: {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Tour Form */}
            <div className='bg-surface-soft rounded-2xl p-8 shadow-card'>
              <h2 className='text-2xl font-heading font-semibold text-text-dark mb-6'>
                Request a Tour
              </h2>
              <TourForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
