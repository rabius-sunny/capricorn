'use client';

import { Inbox } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  label: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ label, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <Inbox className='size-12 text-teal/40 mb-4' />
      <p className='text-sm text-text-mid'>No {label} yet.</p>
      {actionLabel && onAction && (
        <Button
          className='mt-4'
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
