import { Star } from 'lucide-react';

import type { Testimonial } from '@/types';

type TestimonialCardProps = Pick<
  Testimonial,
  'quote' | 'name' | 'relationship' | 'rating'
>;

export function TestimonialCard({
  quote,
  name,
  relationship,
  rating = 5
}: TestimonialCardProps) {
  return (
    <div className='bg-white rounded-2xl p-6 lg:p-8 shadow-card flex flex-col gap-4'>
      {/* Stars */}
      <div className='flex gap-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < rating
                ? 'h-4 w-4 fill-brand-gold text-brand-gold'
                : 'h-4 w-4 fill-gray-200 text-gray-200'
            }
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className='text-base text-text-mid leading-relaxed italic flex-1'>
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div>
        <p className='text-sm font-semibold text-text-dark'>{name}</p>
        <p className='text-xs text-text-light mt-0.5'>{relationship}</p>
      </div>
    </div>
  );
}
