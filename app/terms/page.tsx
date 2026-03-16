import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions for using the Capricorn Group Care LLC website.'
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title='Terms & Conditions'
        subtitle='Please read these terms carefully before using our website.'
      />

      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-sm text-text-light mb-8'>
            Last updated: January 2025
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            1. Acceptance of Terms
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            By accessing or using this website, you agree to be bound by these
            Terms and Conditions. If you do not agree, please do not use this
            website.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            2. Use of the Website
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            This website is provided for informational purposes about the
            services offered by Capricorn Group Care LLC. You agree to use this
            website only for lawful purposes and in a manner that does not
            infringe the rights of others.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            3. Not Medical Advice
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            The information provided on this website is for general
            informational purposes only and does not constitute medical advice.
            Always consult a qualified healthcare professional for medical
            decisions.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            4. Intellectual Property
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            All content on this website — including text, images, and design —
            is the property of Capricorn Group Care LLC and may not be
            reproduced without prior written permission.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            5. Limitation of Liability
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            Capricorn Group Care LLC shall not be liable for any indirect,
            incidental, or consequential damages arising from the use of this
            website or reliance on information provided herein.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            6. Changes to Terms
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            We reserve the right to update these Terms and Conditions at any
            time. Continued use of the website following any changes constitutes
            acceptance of those changes.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            7. Contact
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            For questions about these Terms, contact us at{' '}
            <a
              href='mailto:Admin@Capricornghs.com'
              className='text-teal hover:text-teal-dark font-medium'
            >
              Admin@Capricornghs.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
