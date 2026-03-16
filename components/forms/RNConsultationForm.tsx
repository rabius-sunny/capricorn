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
import { RNConsultationSchema } from '@/lib/validations';
import type { RNConsultationInput } from '@/lib/validations';
import { submitRNConsultation } from '@/actions/submitRNConsultation';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className='text-sm text-destructive mt-1'>{message}</p>;
}

const selectClass =
  'h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

export function RNConsultationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RNConsultationInput>({
    resolver: zodResolver(RNConsultationSchema)
  });

  function onSubmit(data: RNConsultationInput) {
    startTransition(async () => {
      const result = await submitRNConsultation(data);
      if (result.success) {
        router.push('/thank-you/rn');
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
            Full Name <span className='text-destructive'>*</span>
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
            htmlFor='consultationType'
            className='text-sm font-medium text-text-dark'
          >
            Consultation Type <span className='text-destructive'>*</span>
          </Label>
          <select
            id='consultationType'
            {...register('consultationType')}
            aria-invalid={!!errors.consultationType}
            className={cn(
              selectClass,
              errors.consultationType && 'border-destructive'
            )}
          >
            <option value=''>Select type...</option>
            <option value='starter'>Starter — Initial Assessment</option>
            <option value='essential'>
              Essential — Personalized Care Plan
            </option>
            <option value='comprehensive'>Comprehensive — Full Support</option>
            <option value='general'>General Inquiry</option>
          </select>
          <FieldError message={errors.consultationType?.message} />
        </div>
        <div className='space-y-1.5'>
          <Label
            htmlFor='residentAge'
            className='text-sm font-medium text-text-dark'
          >
            Resident Age <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='residentAge'
            type='number'
            placeholder='75'
            min={1}
            max={120}
            {...register('residentAge')}
            aria-invalid={!!errors.residentAge}
            className={cn(errors.residentAge && 'border-destructive')}
          />
          <FieldError message={errors.residentAge?.message} />
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='careNeeds'
          className='text-sm font-medium text-text-dark'
        >
          Care Needs Description <span className='text-destructive'>*</span>
        </Label>
        <Textarea
          id='careNeeds'
          placeholder="Describe the resident's current condition, care needs, and any specific concerns..."
          rows={4}
          {...register('careNeeds')}
          aria-invalid={!!errors.careNeeds}
          className={cn(errors.careNeeds && 'border-destructive')}
        />
        <FieldError message={errors.careNeeds?.message} />
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='preferredDate'
          className='text-sm font-medium text-text-dark'
        >
          Preferred Consultation Date{' '}
          <span className='text-destructive'>*</span>
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
          htmlFor='message'
          className='text-sm font-medium text-text-dark'
        >
          Additional Notes{' '}
          <span className='text-text-light text-xs'>(optional)</span>
        </Label>
        <Textarea
          id='message'
          placeholder='Any additional context or questions...'
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
        {isPending ? 'Submitting...' : 'Request Consultation'}
      </Button>
    </form>
  );
}
