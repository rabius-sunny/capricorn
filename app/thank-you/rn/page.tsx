import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { buttonVariants } from '@/lib/button-variants';
import { cn } from '@/lib/utils';

export default function ThankYouRN() {
  return (
    <div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-teal/5 via-white to-brand-blue/5 px-4 py-20'>
      <div className='text-center max-w-lg'>
        <div className='inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal/10 mb-6'>
          <CheckCircle2 className='h-10 w-10 text-teal' />
        </div>
        <h1 className='text-3xl font-heading font-semibold text-text-dark mb-4'>
          Consultation Request Received!
        </h1>
        <p className='text-base text-text-mid leading-relaxed mb-4'>
          Thank you for requesting an RN Care Plan Consultation with Capricorn
          Group Care. One of our registered nurses will review your request and
          reach out within one business day to confirm your appointment.
        </p>
        <p className='text-sm text-text-light mb-2'>
          <strong>What Happens Next:</strong>
        </p>
        <ul className='text-sm text-text-mid mb-8 space-y-1'>
          <li>✓ Our RN team will review your care needs</li>
          <li>✓ We will contact you to confirm date and time</li>
          <li>✓ Your consultation session will be scheduled</li>
        </ul>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className={cn(
              buttonVariants(),
              'bg-teal text-white hover:bg-teal-dark rounded-xl px-6 py-2.5 h-auto font-semibold'
            )}
          >
            Back to Home
          </Link>
          <Link
            href='/rn-consultation'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-xl px-6 py-2.5 h-auto'
            )}
          >
            View RN Services
          </Link>
        </div>
      </div>
    </div>
  );
}
