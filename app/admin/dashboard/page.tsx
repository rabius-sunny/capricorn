'use client';

import Link from 'next/link';
import { ClipboardList, Stethoscope, Share2, Briefcase } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { useAdminDashboardCount } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/lib/button-variants';

function StatCard({
  label,
  href,
  type,
  icon
}: {
  label: string;
  href: string;
  type: 'tours' | 'consultations' | 'referrals' | 'careers';
  icon: React.ReactNode;
}) {
  const { data, isLoading } = useAdminDashboardCount(type);

  return (
    <div className='bg-white rounded-2xl p-6 shadow-card border-l-4 border-teal'>
      <div className='flex items-start justify-between mb-3'>
        <div className='text-teal'>{icon}</div>
      </div>
      {isLoading ? (
        <Skeleton className='h-8 w-16 mb-1' />
      ) : (
        <p className='text-3xl font-bold text-text-dark'>{data?.count ?? 0}</p>
      )}
      <p className='text-sm text-text-mid mt-1'>{label}</p>
      <Link
        href={href}
        className='text-xs text-teal hover:underline mt-3 block'
      >
        View →
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className='space-y-8'>
      <h1 className='text-2xl font-semibold text-text-dark'>Dashboard</h1>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          label='Tour Requests'
          href='/admin/submissions/tours'
          type='tours'
          icon={<ClipboardList className='size-6' />}
        />
        <StatCard
          label='Consultations'
          href='/admin/submissions/consultations'
          type='consultations'
          icon={<Stethoscope className='size-6' />}
        />
        <StatCard
          label='Referrals'
          href='/admin/submissions/referrals'
          type='referrals'
          icon={<Share2 className='size-6' />}
        />
        <StatCard
          label='Career Applications'
          href='/admin/submissions/careers'
          type='careers'
          icon={<Briefcase className='size-6' />}
        />
      </div>

      <div>
        <p className='text-sm text-text-mid mb-3'>Quick Actions</p>
        <div className='flex flex-wrap gap-3'>
          <Link
            href='/admin/hero'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Edit Hero
          </Link>
          <Link
            href='/admin/services'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Add Service
          </Link>
          <Link
            href='/admin/gallery'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Upload Gallery
          </Link>
          <Link
            href='/admin/faq'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Add FAQ
          </Link>
        </div>
      </div>

      <div className='bg-white rounded-2xl p-6 shadow-card'>
        <p className='text-sm font-medium text-text-dark mb-1'>
          Recent Submissions
        </p>
        <p className='text-sm text-text-mid'>
          Connect MongoDB to view recent submissions.
        </p>
      </div>
    </div>
  );
}
