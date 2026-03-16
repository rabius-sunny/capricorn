'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label='Main navigation'>
      <ul className='hidden md:flex items-center gap-1'>
        {navLinks.map(({ label, href }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'text-teal font-semibold'
                    : 'text-text-mid hover:text-teal hover:bg-teal/5'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
