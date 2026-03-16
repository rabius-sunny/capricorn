'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Image,
  Star,
  Stethoscope,
  HelpCircle,
  Users,
  Phone,
  ClipboardList,
  Share2,
  Briefcase,
  MessageSquare
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    heading: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    heading: 'CONTENT',
    items: [
      { label: 'Hero', href: '/admin/hero', icon: FileText },
      { label: 'Services', href: '/admin/services', icon: Layers },
      { label: 'Gallery', href: '/admin/gallery', icon: Image },
      { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
      { label: 'RN Packages', href: '/admin/rn-packages', icon: Stethoscope },
      { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
      { label: 'Team', href: '/admin/team', icon: Users },
      { label: 'Contact Info', href: '/admin/contact-info', icon: Phone }
    ]
  },
  {
    heading: 'SUBMISSIONS',
    items: [
      {
        label: 'Tour Requests',
        href: '/admin/submissions/tours',
        icon: ClipboardList
      },
      {
        label: 'Consultations',
        href: '/admin/submissions/consultations',
        icon: Stethoscope
      },
      {
        label: 'Referrals',
        href: '/admin/submissions/referrals',
        icon: Share2
      },
      { label: 'Careers', href: '/admin/submissions/careers', icon: Briefcase },
      {
        label: 'Contacts',
        href: '/admin/submissions/contacts',
        icon: MessageSquare
      }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-60 bg-[#1e2a35] text-white h-screen flex flex-col sticky top-0 overflow-y-auto shrink-0'>
      {/* Logo */}
      <div className='px-4 py-5 border-b border-white/10'>
        <div className='flex items-center gap-2'>
          <span className='text-base font-semibold tracking-tight'>
            Capricorn
          </span>
          <span className='text-[10px] font-medium bg-teal/20 text-teal px-1.5 py-0.5 rounded-full'>
            Admin
          </span>
        </div>
        <p className='text-xs text-white/40 mt-0.5'>Group Care LLC</p>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-2 py-4 space-y-5'>
        {navSections.map((section) => (
          <div key={section.heading}>
            <p className='text-xs tracking-wider text-teal/70 px-3 mb-2 font-medium'>
              {section.heading}
            </p>
            <ul className='space-y-0.5'>
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin/dashboard' &&
                    pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-teal/20 text-teal font-medium'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <Icon className='size-4 shrink-0' />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
