import type { Metadata } from 'next';

import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Capricorn Group Care LLC — how we collect, use, and protect your personal information.'
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title='Privacy Policy'
        subtitle='How we collect, use, and protect your personal information.'
      />

      <section className='py-20 lg:py-28 bg-white'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none'>
          <p className='text-sm text-text-light mb-8'>
            Last updated: January 2025
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            1. Information We Collect
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            We collect information you provide directly to us, such as when you
            submit a contact form, request a tour, apply for a position, or
            request an RN consultation. This may include your name, phone
            number, email address, and information about care needs.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            2. How We Use Your Information
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            We use the information we collect to respond to your inquiries,
            schedule tours and consultations, process applications, and
            communicate with you about our services. We do not sell or share
            your personal information with third parties for marketing purposes.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            3. Data Security
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            We take reasonable measures to protect the information you submit
            through this website. However, no internet transmission is
            completely secure, and we cannot guarantee the security of
            information transmitted to us.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            4. Cookies
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            This website may use cookies to improve your browsing experience.
            You can disable cookies through your browser settings; however, some
            features of the website may not function properly.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            5. Third-Party Links
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            Our website may contain links to third-party sites. We are not
            responsible for the privacy practices of those sites and encourage
            you to review their privacy policies.
          </p>

          <h2 className='text-2xl font-heading font-semibold text-text-dark mt-8 mb-4'>
            6. Contact Us
          </h2>
          <p className='text-base text-text-mid leading-relaxed mb-4'>
            If you have questions about this Privacy Policy, please contact us
            at{' '}
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
