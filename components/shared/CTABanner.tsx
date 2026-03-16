import Link from 'next/link';

import { buttonVariants } from '@/lib/button-variants';
import { cn } from '@/lib/utils';

interface CTABannerProps {
  heading: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  variant?: 'teal' | 'dark';
}

export function CTABanner({
  heading,
  subtext,
  buttonLabel,
  buttonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
  variant = 'teal'
}: CTABannerProps) {
  return (
    <section
      className={cn(
        'py-20 lg:py-24',
        variant === 'teal'
          ? 'bg-gradient-to-r from-teal to-brand-blue'
          : 'bg-text-dark'
      )}
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-3xl lg:text-4xl font-heading font-semibold text-white leading-tight'>
          {heading}
        </h2>
        {subtext && (
          <p className='mt-4 text-base text-white/80 leading-relaxed max-w-xl mx-auto'>
            {subtext}
          </p>
        )}
        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href={buttonHref}
            className={cn(
              buttonVariants(),
              'bg-white text-teal-dark hover:bg-white/90 rounded-xl px-8 py-3 font-semibold h-auto'
            )}
          >
            {buttonLabel}
          </Link>
          {secondaryButtonLabel && secondaryButtonHref && (
            <Link
              href={secondaryButtonHref}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'border-white text-white bg-transparent hover:bg-white/10 rounded-xl px-8 py-3 font-semibold h-auto'
              )}
            >
              {secondaryButtonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
