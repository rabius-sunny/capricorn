'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Homes', href: '/our-homes' },
  { label: 'RN Consultation', href: '/rn-consultation' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
];

interface MobileNavProps {
  companyName: string;
  phones: Array<{ name: string; number: string }>;
  email: string;
}

export function MobileNav({ companyName, phones, email }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='md:hidden p-2 rounded-lg text-text-mid hover:text-teal hover:bg-teal/5 transition-colors focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none'
        aria-label='Open navigation menu'
      >
        <Menu className='h-6 w-6' />
      </button>

      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent
          side='right'
          className='w-80 p-0 flex flex-col'
        >
          <SheetTitle className='sr-only'>Navigation menu</SheetTitle>

          {/* Header */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
            <Link
              href='/'
              onClick={() => setOpen(false)}
              className='text-lg font-heading font-semibold text-teal leading-tight'
            >
              {companyName}
            </Link>
            <button
              onClick={() => setOpen(false)}
              className='p-1.5 rounded-lg text-text-light hover:text-text-dark transition-colors'
              aria-label='Close menu'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          {/* Nav Links */}
          <nav className='flex-1 overflow-y-auto px-4 py-4'>
            <ul className='space-y-1'>
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-teal/10 text-teal font-semibold'
                          : 'text-text-mid hover:bg-surface-soft hover:text-text-dark'
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className='mt-6 pt-6 border-t border-gray-100'>
              <Link
                href='/schedule-a-tour'
                onClick={() => setOpen(false)}
                className={buttonVariants({
                  className:
                    'w-full bg-teal text-white hover:bg-teal-dark rounded-xl h-auto py-3 font-semibold'
                })}
              >
                Schedule a Tour
              </Link>
            </div>
          </nav>

          {/* Contact Footer */}
          <div className='px-6 py-4 border-t border-gray-100 space-y-2'>
            {phones[0] && (
              <a
                href={`tel:${phones[0].number.replace(/[^0-9+]/g, '')}`}
                className='flex items-center gap-2 text-sm text-text-light hover:text-teal transition-colors'
              >
                <Phone className='h-4 w-4 shrink-0' />
                <span>
                  {phones[0].name}: {phones[0].number}
                </span>
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className='flex items-center gap-2 text-sm text-text-light hover:text-teal transition-colors'
            >
              <Mail className='h-4 w-4 shrink-0' />
              <span className='truncate'>{email}</span>
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
