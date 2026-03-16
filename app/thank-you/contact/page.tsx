import Link from 'next/link';
import { CheckCircle2, Phone } from 'lucide-react';
import { buttonVariants } from '@/lib/button-variants';
import { cn } from '@/lib/utils';

export default function ThankYouContact() {
  return (
    <div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-teal/5 via-white to-brand-blue/5 px-4 py-20'>
      <div className='text-center max-w-lg'>
        <div className='inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal/10 mb-6'>
          <CheckCircle2 className='h-10 w-10 text-teal' />
        </div>
        <h1 className='text-3xl font-heading font-semibold text-text-dark mb-4'>
          Message Received!
        </h1>
        <p className='text-base text-text-mid leading-relaxed mb-4'>
          Thank you for reaching out to Capricorn Group Care. Our team will
          review your message and get back to you within one business day.
        </p>
        <p className='text-sm text-text-light mb-8'>
          If you need immediate assistance, please call us directly.
        </p>
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
            href='/schedule-a-tour'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-xl px-6 py-2.5 h-auto'
            )}
          >
            Schedule a Tour
          </Link>
        </div>
      </div>
    </div>
  );
}
