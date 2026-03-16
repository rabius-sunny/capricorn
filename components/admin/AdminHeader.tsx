'use client';

import Link from 'next/link';
import { ArrowLeft, LogOut } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { adminLogout } from '@/actions/admin/logout';

export function AdminHeader() {
  return (
    <header className='bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10'>
      {/* Left */}
      <div className='flex items-center gap-3'>
        <div className='size-7 rounded-md bg-teal flex items-center justify-center'>
          <span className='text-white text-xs font-bold'>C</span>
        </div>
        <span className='font-semibold text-text-dark text-sm'>
          Admin Panel
        </span>
        <Badge
          variant='outline'
          className='text-xs'
        >
          Capricorn Group Care
        </Badge>
      </div>

      {/* Right */}
      <div className='flex items-center gap-4'>
        <Link
          href='/'
          className='flex items-center gap-1.5 text-sm text-text-mid hover:text-teal transition-colors'
        >
          <ArrowLeft className='size-3.5' />
          View Site
        </Link>

        <div className='w-px h-4 bg-gray-200' />

        <form action={adminLogout}>
          <button
            type='submit'
            className='flex items-center gap-1.5 text-sm text-text-mid hover:text-red-500 transition-colors'
          >
            <LogOut className='size-3.5' />
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
