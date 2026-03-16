import * as LucideIcons from 'lucide-react';

import type { TrustIndicator } from '@/types';

type TrustBadgeProps = Pick<TrustIndicator, 'icon' | 'label' | 'description'>;

export function TrustBadge({ icon, label, description }: TrustBadgeProps) {
  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ className?: string }>
    >
  )[icon];

  return (
    <div className='flex flex-col items-center text-center gap-3 px-4'>
      <div className='inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal/10'>
        {IconComponent ? (
          <IconComponent className='h-6 w-6 text-teal' />
        ) : (
          <span className='text-teal text-xl'>✦</span>
        )}
      </div>
      <div>
        <p className='text-sm font-semibold text-text-dark'>{label}</p>
        {description && (
          <p className='text-xs text-text-light mt-0.5'>{description}</p>
        )}
      </div>
    </div>
  );
}
