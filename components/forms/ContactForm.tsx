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
import { ContactFormSchema } from '@/lib/validations';
import type { ContactFormInput } from '@/lib/validations';
import { submitContactForm } from '@/actions/submitContactForm';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className='text-sm text-destructive mt-1'>{message}</p>;
}

const selectClass =
  'h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

export function ContactForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema)
  });

  function onSubmit(data: ContactFormInput) {
    startTransition(async () => {
      const result = await submitContactForm(data);
      if (result.success) {
        router.push('/thank-you/contact');
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
        {/* Full Name */}
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

        {/* Phone */}
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
      </div>

      {/* Email */}
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

      {/* Reason */}
      <div className='space-y-1.5'>
        <Label
          htmlFor='reason'
          className='text-sm font-medium text-text-dark'
        >
          Reason for Contact <span className='text-destructive'>*</span>
        </Label>
        <select
          id='reason'
          {...register('reason')}
          aria-invalid={!!errors.reason}
          className={cn(selectClass, errors.reason && 'border-destructive')}
        >
          <option value=''>Select a reason...</option>
          <option value='general'>General Inquiry</option>
          <option value='care'>Care Services</option>
          <option value='tour'>Schedule a Tour</option>
          <option value='rn'>RN Consultation</option>
          <option value='referral'>Referral</option>
          <option value='other'>Other</option>
        </select>
        <FieldError message={errors.reason?.message} />
      </div>

      {/* Message */}
      <div className='space-y-1.5'>
        <Label
          htmlFor='message'
          className='text-sm font-medium text-text-dark'
        >
          Message <span className='text-destructive'>*</span>
        </Label>
        <Textarea
          id='message'
          placeholder='How can we help you?'
          rows={4}
          {...register('message')}
          aria-invalid={!!errors.message}
          className={cn(errors.message && 'border-destructive')}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-teal text-white hover:bg-teal-dark rounded-xl h-auto py-3 font-semibold'
      >
        {isPending ? <Loader2 className='animate-spin mr-2 h-4 w-4' /> : null}
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
