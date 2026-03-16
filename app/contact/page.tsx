import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { getContactInfo } from '@/lib/data/getContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Capricorn Group Care LLC. Call, email, or send us a message — our team is happy to answer your questions about residential care.'
};

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <>
      <PageHero
        title='Contact Us'
        subtitle="Have a question or ready to take the next step? We're here to help."
      />

      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div>
              <h2 className='text-2xl font-heading font-semibold text-text-dark mb-8'>
                Get in Touch
              </h2>
              <div className='space-y-6'>
                {contactInfo.phones.map((phone) => (
                  <div
                    key={phone.name}
                    className='flex items-start gap-4'
                  >
                    <div className='inline-flex items-center justify-center h-10 w-10 rounded-xl bg-teal/10 shrink-0'>
                      <Phone className='h-5 w-5 text-teal' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-text-dark'>
                        {phone.name}
                      </p>
                      <a
                        href={`tel:${phone.number.replace(/[^0-9+]/g, '')}`}
                        className='text-base text-teal hover:text-teal-dark font-medium transition-colors'
                      >
                        {phone.number}
                      </a>
                    </div>
                  </div>
                ))}
                <div className='flex items-start gap-4'>
                  <div className='inline-flex items-center justify-center h-10 w-10 rounded-xl bg-teal/10 shrink-0'>
                    <Mail className='h-5 w-5 text-teal' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-text-dark'>
                      Email
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className='text-base text-teal hover:text-teal-dark font-medium transition-colors'
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='inline-flex items-center justify-center h-10 w-10 rounded-xl bg-teal/10 shrink-0'>
                    <MapPin className='h-5 w-5 text-teal' />
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-text-dark'>
                      Service Areas
                    </p>
                    <p className='text-base text-text-mid'>
                      {contactInfo.serviceAreas.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-10 p-6 bg-surface-soft rounded-2xl'>
                <h3 className='font-semibold text-text-dark mb-2'>
                  Prefer to Schedule a Tour?
                </h3>
                <p className='text-sm text-text-mid mb-4'>
                  Visit one of our homes in person and meet our care team.
                </p>
                <Link
                  href='/schedule-a-tour'
                  className='inline-flex items-center text-teal font-semibold hover:text-teal-dark transition-colors text-sm'
                >
                  Schedule a Tour →
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className='bg-surface-soft rounded-2xl p-8 shadow-card'>
              <h2 className='text-2xl font-heading font-semibold text-text-dark mb-6'>
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
