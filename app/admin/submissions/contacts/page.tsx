'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminSubmissions } from '@/hooks/useAdminData';
import type { ContactSubmission } from '@/types';
import { updateSubmissionStatus } from '@/actions/admin/updateSubmissionStatus';
import { deleteRecord } from '@/actions/admin/deleteRecord';

const columns = [
  { key: 'fullName', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'reason', label: 'Reason' },
  { key: 'message', label: 'Message' },
  { key: 'status', label: 'Status', className: 'w-24' },
  { key: 'createdAt', label: 'Submitted', className: 'w-36' }
];

function DetailRow({
  label,
  value
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className='text-xs text-text-mid'>{label}</p>
      <p className='text-sm font-medium text-text-dark mt-0.5'>
        {value ?? '—'}
      </p>
    </div>
  );
}

export default function ContactSubmissionsPage() {
  const { submissions, isLoading, mutate } = useAdminSubmissions('contacts');
  const [selectedItem, setSelectedItem] = useState<ContactSubmission | null>(
    null
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function openSheet(item: ContactSubmission) {
    setSelectedItem(item);
    setSheetOpen(true);
  }

  function markReviewed(item: ContactSubmission) {
    startTransition(async () => {
      const result = await updateSubmissionStatus(
        item.id,
        'contacts',
        'reviewed'
      );
      if (result.success) {
        toast.success('Marked as reviewed.');
        void mutate();
      } else {
        toast.error('Failed to update status.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteRecord(id, 'contactSubmission');
      if (result.success) {
        toast.success('Submission deleted.');
        void mutate();
        if (selectedItem?.id === id) setSheetOpen(false);
      } else {
        toast.error('Failed to delete.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-text-dark'>
        Contact Submissions
      </h1>

      <DataTable
        columns={columns}
        data={submissions as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        emptyLabel='contact submissions'
        renderCell={(key, row) => {
          if (key === 'status')
            return <StatusBadge status={String(row.status ?? '')} />;
          if (key === 'message')
            return <span>{String(row.message ?? '').slice(0, 40)}…</span>;
          if (key === 'createdAt')
            return (
              <span>
                {new Date(row.createdAt as string).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            );
          return <span>{String(row[key] ?? '')}</span>;
        }}
        actions={(row) => {
          const item = row as unknown as ContactSubmission;
          return (
            <div className='flex items-center justify-end gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => openSheet(item)}
              >
                View
              </Button>
              {item.status !== 'reviewed' && (
                <Button
                  variant='outline'
                  size='sm'
                  disabled={isPending}
                  onClick={() => markReviewed(item)}
                >
                  Mark Reviewed
                </Button>
              )}
              <ConfirmDialog
                title='Delete Submission'
                description='Are you sure you want to delete this contact submission?'
                onConfirm={() => handleDelete(item.id)}
                trigger={
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-destructive hover:text-destructive'
                  >
                    Delete
                  </Button>
                }
              />
            </div>
          );
        }}
      />

      <Sheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      >
        <SheetContent className='w-full sm:max-w-lg overflow-y-auto'>
          <SheetHeader className='pb-4'>
            <SheetTitle>Contact Submission Details</SheetTitle>
            {selectedItem && (
              <SheetDescription>
                Submitted{' '}
                {new Date(selectedItem.createdAt as string).toLocaleDateString(
                  'en-US',
                  {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }
                )}
              </SheetDescription>
            )}
          </SheetHeader>

          {selectedItem && (
            <div className='px-4 space-y-5 pb-8'>
              <div className='flex items-center gap-2'>
                <StatusBadge status={selectedItem.status} />
                {selectedItem.status !== 'reviewed' && (
                  <Button
                    size='sm'
                    variant='outline'
                    disabled={isPending}
                    onClick={() => markReviewed(selectedItem)}
                  >
                    Mark Reviewed
                  </Button>
                )}
              </div>

              <Separator />

              <div className='grid grid-cols-2 gap-4'>
                <DetailRow
                  label='Full Name'
                  value={selectedItem.fullName}
                />
                <DetailRow
                  label='Phone'
                  value={selectedItem.phone}
                />
                <DetailRow
                  label='Email'
                  value={selectedItem.email}
                />
                <DetailRow
                  label='Reason'
                  value={selectedItem.reason}
                />
              </div>

              <Separator />

              <DetailRow
                label='Message'
                value={selectedItem.message}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
