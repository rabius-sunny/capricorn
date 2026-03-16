import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClass =
    status === 'new'
      ? 'bg-teal/10 text-teal border-teal/20'
      : status === 'reviewed'
        ? 'bg-gray-100 text-gray-500 border-gray-200'
        : 'bg-amber-50 text-amber-600 border-amber-200';

  return (
    <Badge className={cn('text-xs font-medium capitalize', statusClass)}>
      {status}
    </Badge>
  );
}
