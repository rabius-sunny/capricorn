import Link from 'next/link';
import { Check } from 'lucide-react';

import { buttonVariants } from '@/lib/button-variants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RNPackage } from '@/types';

interface RNPricingCardProps extends RNPackage {
  ctaHref?: string;
}

export function RNPricingCard({
  tier,
  price,
  tagline,
  features,
  featured,
  ctaHref = '/rn-consultation#request'
}: RNPricingCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-card border transition-all duration-300',
        featured
          ? 'border-2 border-teal ring-2 ring-teal/20 scale-105 shadow-elevated'
          : 'border-gray-100 hover:shadow-elevated'
      )}
    >
      {featured && (
        <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
          <Badge className='bg-brand-gold text-white px-4 py-1 text-xs font-semibold uppercase tracking-wider rounded-full'>
            Most Popular
          </Badge>
        </div>
      )}

      {/* Tier */}
      <div>
        <span className='inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-label font-semibold tracking-wider uppercase'>
          {tier}
        </span>
        <p className='mt-2 text-sm text-text-light'>{tagline}</p>
      </div>

      {/* Price */}
      <div className='flex items-end gap-1'>
        <span className='text-4xl font-heading font-semibold text-text-dark'>
          ${price.toLocaleString()}
        </span>
        <span className='text-sm text-text-light mb-1'>/ consultation</span>
      </div>

      {/* Features */}
      <ul className='flex flex-col gap-3 flex-1'>
        {features.map((feature) => (
          <li
            key={feature}
            className='flex items-start gap-3'
          >
            <Check className='h-4 w-4 text-teal shrink-0 mt-0.5' />
            <span className='text-sm text-text-mid'>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={ctaHref}
        className={buttonVariants({
          className: cn(
            'w-full rounded-xl h-auto py-3 font-semibold',
            featured
              ? 'bg-teal text-white hover:bg-teal-dark'
              : 'bg-teal/10 text-teal hover:bg-teal/20'
          )
        })}
      >
        Request This Plan
      </Link>
    </div>
  );
}
