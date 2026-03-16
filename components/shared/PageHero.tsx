import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        'bg-gradient-to-br from-teal/10 via-white to-brand-blue/5 py-20 lg:py-24',
        className
      )}
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-dark leading-tight'>
          {title}
        </h1>
        {subtitle && (
          <p className='mt-5 text-lg text-text-mid leading-relaxed max-w-2xl mx-auto'>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
