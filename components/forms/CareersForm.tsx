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
import { CareersApplicationSchema } from '@/lib/validations';
import type { CareersApplicationInput } from '@/lib/validations';
import { submitCareersApplication } from '@/actions/submitCareersApplication';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className='text-sm text-destructive mt-1'>{message}</p>;
}

const selectClass =
  'h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

export function CareersForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CareersApplicationInput>({
    resolver: zodResolver(CareersApplicationSchema)
  });

  function onSubmit(data: CareersApplicationInput) {
    startTransition(async () => {
      const result = await submitCareersApplication(data);
      if (result.success) {
        router.push('/thank-you/careers');
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

      <div className='space-y-1.5'>
        <Label
          htmlFor='position'
          className='text-sm font-medium text-text-dark'
        >
          Position Applying For <span className='text-destructive'>*</span>
        </Label>
        <select
          id='position'
          {...register('position')}
          aria-invalid={!!errors.position}
          className={cn(selectClass, errors.position && 'border-destructive')}
        >
          <option value=''>Select position...</option>
          <option value='caregiver'>Caregiver / Direct Care Staff</option>
          <option value='med-tech'>Medication Technician</option>
          <option value='cna'>Certified Nursing Assistant (CNA)</option>
          <option value='rn'>Registered Nurse (RN)</option>
          <option value='lpn'>Licensed Practical Nurse (LPN)</option>
          <option value='care-coordinator'>Care Coordinator</option>
          <option value='other'>Other</option>
        </select>
        <FieldError message={errors.position?.message} />
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='resumeUrl'
          className='text-sm font-medium text-text-dark'
        >
          Resume Link <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='resumeUrl'
          type='url'
          placeholder='https://drive.google.com/your-resume or LinkedIn URL'
          {...register('resumeUrl')}
          aria-invalid={!!errors.resumeUrl}
          className={cn(errors.resumeUrl && 'border-destructive')}
        />
        <p className='text-xs text-text-light'>
          Paste a link to your resume (Google Drive, Dropbox, LinkedIn, or
          similar)
        </p>
        <FieldError message={errors.resumeUrl?.message} />
      </div>

      <div className='space-y-1.5'>
        <Label
          htmlFor='coverNote'
          className='text-sm font-medium text-text-dark'
        >
          Cover Note <span className='text-text-light text-xs'>(optional)</span>
        </Label>
        <Textarea
          id='coverNote'
          placeholder='Tell us a little about yourself, your experience, and why you want to work with Capricorn Care...'
          rows={4}
          {...register('coverNote')}
        />
      </div>

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-teal text-white hover:bg-teal-dark rounded-xl h-auto py-3 font-semibold'
      >
        {isPending ? <Loader2 className='animate-spin mr-2 h-4 w-4' /> : null}
        {isPending ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
