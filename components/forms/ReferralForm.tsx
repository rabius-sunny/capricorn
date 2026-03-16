'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ReferralSchema } from '@/lib/validations';
import type { ReferralInput } from '@/lib/validations';
import { submitReferral } from '@/actions/submitReferral';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className='text-sm text-destructive mt-1'>{message}</p>;
}

const selectClass =
  'h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

export function ReferralForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReferralInput>({
    resolver: zodResolver(ReferralSchema)
  });

  function onSubmit(data: ReferralInput) {
    startTransition(async () => {
      const result = await submitReferral(data);
      if (result.success) {
        router.push('/thank-you/referral');
      } else {
        toast.error(
          result.errors?.formErrors[0] ??
            'Something went wrong. Please try again.'
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5'
      noValidate
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label
            htmlFor='referrerName'
            className='text-sm font-medium text-text-dark'
          >
            Your Name <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='referrerName'
            placeholder='Dr. Jane Smith'
            {...register('referrerName')}
            aria-invalid={!!errors.referrerName}
            className={cn(errors.referrerName && 'border-destructive')}
          />
          <FieldError message={errors.referrerName?.message} />
        </div>
        <div className='space-y-1.5'>
          <Label
            htmlFor='organization'
            className='text-sm font-medium text-text-dark'
          >
            Organization / Hospital <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='organization'
            placeholder='Medical Center Name'
            {...register('organization')}
            aria-invalid={!!errors.organization}
            className={cn(errors.organization && 'border-destructive')}
          />
          <FieldError message={errors.organization?.message} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label
            htmlFor='phone'
            className='text-sm font-medium text-text-dark'
          >
            Phone <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='phone'
            type='tel'
            placeholder='(469) 555-0100'
            {...register('phone')}
            aria-invalid={!!errors.phone}
            className={cn(errors.phone && 'border-destructive')}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className='space-y-1.5'>
          <Label
            htmlFor='email'
            className='text-sm font-medium text-text-dark'
          >
            Email <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='jane@hospital.org'
            {...register('email')}
            aria-invalid={!!errors.email}
            className={cn(errors.email && 'border-destructive')}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='residentNeeds'
          className='text-sm font-medium text-text-dark'
        >
          Resident Needs & Condition <span className='text-destructive'>*</span>
        </Label>
        <Textarea
          id='residentNeeds'
          placeholder="Describe the patient's care needs, diagnosis, and current status..."
          rows={4}
          {...register('residentNeeds')}
          aria-invalid={!!errors.residentNeeds}
          className={cn(errors.residentNeeds && 'border-destructive')}
        />
        <FieldError message={errors.residentNeeds?.message} />
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='timeline'
          className='text-sm font-medium text-text-dark'
        >
          Discharge / Move-In Timeline{' '}
          <span className='text-destructive'>*</span>
        </Label>
        <select
          id='timeline'
          {...register('timeline')}
          aria-invalid={!!errors.timeline}
          className={cn(selectClass, errors.timeline && 'border-destructive')}
        >
          <option value=''>Select timeline...</option>
          <option value='immediate'>Immediate (within 48 hours)</option>
          <option value='this-week'>This week</option>
          <option value='2-weeks'>Within 2 weeks</option>
          <option value='1-month'>Within 1 month</option>
          <option value='planning'>Planning ahead</option>
        </select>
        <FieldError message={errors.timeline?.message} />
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='notes'
          className='text-sm font-medium text-text-dark'
        >
          Additional Notes{' '}
          <span className='text-text-light text-xs'>(optional)</span>
        </Label>
        <Textarea
          id='notes'
          placeholder='Any other relevant details...'
          rows={3}
          {...register('notes')}
        />
      </div>

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-teal text-white hover:bg-teal-dark rounded-xl h-auto py-3 font-semibold'
      >
        {isPending ? <Loader2 className='animate-spin mr-2 h-4 w-4' /> : null}
        {isPending ? 'Submitting...' : 'Submit Referral'}
      </Button>
    </form>
  );
}
