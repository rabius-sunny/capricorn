import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {label && (
        <span className='inline-block mb-3 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-label font-semibold tracking-widest uppercase'>
          {label}
        </span>
      )}
      <h2 className='text-3xl lg:text-4xl font-heading font-semibold text-text-dark leading-tight'>
        {title}
      </h2>
      {subtitle && (
        <p className='mt-4 text-base text-text-mid leading-relaxed max-w-2xl mx-auto'>
          {subtitle}
        </p>
      )}
    </div>
  );
}
