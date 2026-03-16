import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

import { getContactInfo } from '@/lib/data/getContactInfo';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Homes', href: '/our-homes' },
  { label: 'RN Consultation', href: '/rn-consultation' }
];

const moreLinks = [
  { label: 'Referral Partners', href: '/referral-partners' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' }
];

export async function Footer() {
  const contactInfo = await getContactInfo();

  return (
    <footer className='bg-text-dark text-white'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
          {/* Brand + Contact */}
          <div className='lg:col-span-1'>
            <Link
              href='/'
              className='inline-block mb-4'
            >
              <span className='font-heading font-semibold text-xl text-white'>
                Capricorn<span className='text-teal-light ml-1'>Care</span>
              </span>
            </Link>
            <p className='text-sm text-white/60 leading-relaxed mb-5'>
              Providing compassionate residential care for seniors and adults in
              the Dallas-Fort Worth area.
            </p>
            <ul className='space-y-3'>
              {contactInfo.phones.map((phone) => (
                <li key={phone.number}>
                  <a
                    href={`tel:${phone.number.replace(/[^0-9+]/g, '')}`}
                    className='flex items-center gap-2 text-sm text-white/70 hover:text-teal-light transition-colors'
                  >
                    <Phone className='h-4 w-4 shrink-0' />
                    <span>
                      {phone.name}: {phone.number}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className='flex items-center gap-2 text-sm text-white/70 hover:text-teal-light transition-colors'
                >
                  <Mail className='h-4 w-4 shrink-0' />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              {contactInfo.serviceAreas.length > 0 && (
                <li className='flex items-start gap-2 text-sm text-white/70'>
                  <MapPin className='h-4 w-4 shrink-0 mt-0.5' />
                  <span>{contactInfo.serviceAreas.join(' · ')}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xs font-label font-semibold tracking-widest uppercase text-teal-light mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-2.5'>
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='text-sm text-white/70 hover:text-white transition-colors'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className='text-xs font-label font-semibold tracking-widest uppercase text-teal-light mb-4'>
              More
            </h3>
            <ul className='space-y-2.5'>
              {moreLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='text-sm text-white/70 hover:text-white transition-colors'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className='text-xs font-label font-semibold tracking-widest uppercase text-teal-light mb-4'>
              Ready to Get Started?
            </h3>
            <p className='text-sm text-white/60 leading-relaxed mb-4'>
              Schedule a tour or send us a message — we&apos;re here to help
              your family find the right care.
            </p>
            <Link
              href='/schedule-a-tour'
              className='inline-block bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors'
            >
              Schedule a Tour →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40'>
          <p>
            &copy; {new Date().getFullYear()} {contactInfo.companyName}. All
            rights reserved.
          </p>
          <ul className='flex gap-4'>
            {legalLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className='hover:text-white/70 transition-colors'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
