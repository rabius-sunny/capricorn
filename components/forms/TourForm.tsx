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
import { TourRequestSchema } from '@/lib/validations';
import type { TourRequestInput } from '@/lib/validations';
import { submitTourRequest } from '@/actions/submitTourRequest';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className='text-sm text-destructive mt-1'>{message}</p>;
}

const selectClass =
  'h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

export function TourForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TourRequestInput>({
    resolver: zodResolver(TourRequestSchema)
  });

  function onSubmit(data: TourRequestInput) {
    startTransition(async () => {
      const result = await submitTourRequest(data);
      if (result.success) {
        router.push('/thank-you/tour');
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
            htmlFor='fullName'
            className='text-sm font-medium text-text-dark'
          >
            Your Full Name <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='fullName'
            placeholder='Jane Smith'
            {...register('fullName')}
            aria-invalid={!!errors.fullName}
            className={cn(errors.fullName && 'border-destructive')}
          />
          <FieldError message={errors.fullName?.message} />
        </div>
        <div className='space-y-1.5'>
          <Label
            htmlFor='phone'
            className='text-sm font-medium text-text-dark'
          >
            Phone Number <span className='text-destructive'>*</span>
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
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='email'
          className='text-sm font-medium text-text-dark'
        >
          Email Address <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='jane@example.com'
          {...register('email')}
          aria-invalid={!!errors.email}
          className={cn(errors.email && 'border-destructive')}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label
            htmlFor='residentName'
            className='text-sm font-medium text-text-dark'
          >
            Resident Name <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='residentName'
            placeholder='Resident full name'
            {...register('residentName')}
            aria-invalid={!!errors.residentName}
            className={cn(errors.residentName && 'border-destructive')}
          />
          <FieldError message={errors.residentName?.message} />
        </div>
        <div className='space-y-1.5'>
          <Label
            htmlFor='relationship'
            className='text-sm font-medium text-text-dark'
          >
            Your Relationship to Resident{' '}
            <span className='text-destructive'>*</span>
          </Label>
          <select
            id='relationship'
            {...register('relationship')}
            aria-invalid={!!errors.relationship}
            className={cn(
              selectClass,
              errors.relationship && 'border-destructive'
            )}
          >
            <option value=''>Select relationship...</option>
            <option value='son'>Son</option>
            <option value='daughter'>Daughter</option>
            <option value='spouse'>Spouse</option>
            <option value='sibling'>Sibling</option>
            <option value='caregiver'>Professional Caregiver</option>
            <option value='self'>Self</option>
            <option value='other'>Other</option>
          </select>
          <FieldError message={errors.relationship?.message} />
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='careNeeds'
          className='text-sm font-medium text-text-dark'
        >
          Care Needs <span className='text-destructive'>*</span>
        </Label>
        <Textarea
          id='careNeeds'
          placeholder='Briefly describe the level of care and any specific needs...'
          rows={3}
          {...register('careNeeds')}
          aria-invalid={!!errors.careNeeds}
          className={cn(errors.careNeeds && 'border-destructive')}
        />
        <FieldError message={errors.careNeeds?.message} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label
            htmlFor='preferredDate'
            className='text-sm font-medium text-text-dark'
          >
            Preferred Date <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='preferredDate'
            type='date'
            {...register('preferredDate')}
            aria-invalid={!!errors.preferredDate}
            className={cn(errors.preferredDate && 'border-destructive')}
          />
          <FieldError message={errors.preferredDate?.message} />
        </div>
        <div className='space-y-1.5'>
          <Label
            htmlFor='preferredTime'
            className='text-sm font-medium text-text-dark'
          >
            Preferred Time <span className='text-destructive'>*</span>
          </Label>
          <select
            id='preferredTime'
            {...register('preferredTime')}
            aria-invalid={!!errors.preferredTime}
            className={cn(
              selectClass,
              errors.preferredTime && 'border-destructive'
            )}
          >
            <option value=''>Select time...</option>
            <option value='morning'>Morning (9am–12pm)</option>
            <option value='afternoon'>Afternoon (12pm–4pm)</option>
            <option value='evening'>Evening (4pm–6pm)</option>
          </select>
          <FieldError message={errors.preferredTime?.message} />
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='message'
          className='text-sm font-medium text-text-dark'
        >
          Additional Notes{' '}
          <span className='text-text-light text-xs'>(optional)</span>
        </Label>
        <Textarea
          id='message'
          placeholder="Any additional information you'd like us to know..."
          rows={3}
          {...register('message')}
        />
      </div>

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-teal text-white hover:bg-teal-dark rounded-xl h-auto py-3 font-semibold'
      >
        {isPending ? <Loader2 className='animate-spin mr-2 h-4 w-4' /> : null}
        {isPending ? 'Submitting...' : 'Request a Tour'}
      </Button>
    </form>
  );
}
