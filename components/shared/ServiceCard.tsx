import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Service } from '@/types';

type ServiceCardProps = Pick<
  Service,
  'icon' | 'title' | 'description' | 'href'
>;

export function ServiceCard({
  icon,
  title,
  description,
  href
}: ServiceCardProps) {
  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[icon];

  const content = (
    <div
      className={cn(
        'group bg-white rounded-2xl p-6 shadow-card border-t-4 border-teal',
        'transition-all duration-300 hover:shadow-elevated',
        href && 'cursor-pointer'
      )}
    >
      <div className='mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-teal/10'>
        {IconComponent ? (
          <IconComponent className='h-6 w-6 text-teal' />
        ) : (
          <span className='text-teal text-xl'>✦</span>
        )}
      </div>
      <h3 className='text-xl font-semibold text-text-dark mb-2 group-hover:text-teal transition-colors duration-150'>
        {title}
      </h3>
      <p className='text-sm text-text-mid leading-relaxed'>{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
