import Link from 'next/link';
import { buttonVariants } from '@/lib/button-variants';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-teal/5 via-white to-brand-blue/5 px-4'>
      <div className='text-center max-w-lg'>
        <div className='text-8xl font-heading font-semibold text-teal/20 leading-none mb-4'>
          404
        </div>
        <h1 className='text-3xl font-heading font-semibold text-text-dark mb-4'>
          Page Not Found
        </h1>
        <p className='text-base text-text-mid leading-relaxed mb-8'>
          We couldn&apos;t find the page you were looking for. It may have been
          moved or no longer exists.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className={cn(
              buttonVariants(),
              'bg-teal text-white hover:bg-teal-dark rounded-xl px-6 py-2.5 h-auto font-semibold'
            )}
          >
            ← Back to Home
          </Link>
          <Link
            href='/contact'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-xl px-6 py-2.5 h-auto'
            )}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
