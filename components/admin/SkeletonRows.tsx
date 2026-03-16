import { TableRow, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonRowsProps {
  count?: number;
}

export function SkeletonRows({ count = 5 }: SkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className='h-4 w-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-full' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-full' />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
