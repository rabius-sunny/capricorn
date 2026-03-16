'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { SkeletonRows } from '@/components/admin/SkeletonRows';
import { EmptyState } from '@/components/admin/EmptyState';

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  isLoading?: boolean;
  emptyLabel?: string;
  renderCell: (key: string, row: Record<string, unknown>) => React.ReactNode;
  actions?: (row: Record<string, unknown>) => React.ReactNode;
}

export function DataTable({
  columns,
  data,
  isLoading = false,
  emptyLabel = 'records',
  renderCell,
  actions
}: DataTableProps) {
  return (
    <div className='rounded-xl border border-gray-200 bg-white overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow className='bg-surface-soft'>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.className}
              >
                {col.label}
              </TableHead>
            ))}
            {actions && <TableHead className='text-right'>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonRows count={5} />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className='p-0'
              >
                <EmptyState label={emptyLabel} />
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow key={(row.id as string) ?? i}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={col.className}
                  >
                    {renderCell(col.key, row)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className='text-right'>{actions(row)}</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
