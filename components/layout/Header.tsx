import Link from 'next/link';

import { buttonVariants } from '@/lib/button-variants';
import { NavLinks } from './NavLinks';
import { MobileNav } from './MobileNav';
import { getContactInfo } from '@/lib/data/getContactInfo';

export async function Header() {
  const contactInfo = await getContactInfo();

  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 lg:h-[72px]'>
          {/* Logo */}
          <Link
            href='/'
            className='flex-shrink-0 font-heading font-semibold text-xl text-teal leading-tight'
            aria-label={`${contactInfo.companyName} — Home`}
          >
            <span className='text-text-dark'>Capricorn</span>
            <span className='text-teal ml-1'>Care</span>
          </Link>

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Desktop CTA + Mobile Hamburger */}
          <div className='flex items-center gap-3'>
            <Link
              href='/schedule-a-tour'
              className={buttonVariants({
                className:
                  'hidden md:inline-flex bg-teal text-white hover:bg-teal-dark rounded-xl px-5 py-2.5 h-auto font-semibold text-sm'
              })}
            >
              Schedule a Tour →
            </Link>
            <MobileNav
              companyName={contactInfo.companyName}
              phones={contactInfo.phones}
              email={contactInfo.email}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
