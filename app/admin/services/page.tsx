'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { DataTable } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminServices } from '@/hooks/useAdminData';
import { ServiceSchema, type ServiceInput } from '@/lib/validations';
import type { Service } from '@/types';
import { updateService } from '@/actions/admin/updateService';
import { deleteRecord } from '@/actions/admin/deleteRecord';

const columns = [
  { key: 'order', label: 'Order', className: 'w-16' },
  { key: 'icon', label: 'Icon', className: 'w-28' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' }
];

export default function ServicesPage() {
  const { services, isLoading, mutate } = useAdminServices();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ServiceInput>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      order: '',
      icon: '',
      title: '',
      description: '',
      href: ''
    }
  });

  function openAdd() {
    setEditingItem(null);
    form.reset({ order: '', icon: '', title: '', description: '', href: '' });
    setDialogOpen(true);
  }

  function openEdit(item: Service) {
    setEditingItem(item);
    form.reset({
      order: String(item.order),
      icon: item.icon,
      title: item.title,
      description: item.description,
      href: item.href
    });
    setDialogOpen(true);
  }

  function onSubmit(data: ServiceInput) {
    startTransition(async () => {
      const result = await updateService(data, editingItem?.id);
      if (result.success) {
        toast.success(editingItem ? 'Service updated.' : 'Service created.');
        void mutate();
        setDialogOpen(false);
      } else {
        toast.error(result.errors?.formErrors[0] ?? 'Failed to save.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteRecord(id, 'service');
      if (result.success) {
        toast.success('Service deleted.');
        void mutate();
      } else {
        toast.error('Failed to delete.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-text-dark'>Services</h1>
        <Button
          onClick={openAdd}
          className='bg-teal text-white hover:bg-teal/90'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New Service
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={services as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        emptyLabel='services'
        renderCell={(key, row) => {
          if (key === 'description')
            return <span>{String(row.description ?? '').slice(0, 60)}…</span>;
          return <span>{String(row[key] ?? '')}</span>;
        }}
        actions={(row) => {
          const item = row as unknown as Service;
          return (
            <div className='flex items-center justify-end gap-2'>
              <Button
                variant='ghost'
                size='icon-sm'
                onClick={() => openEdit(item)}
              >
                <Pencil className='size-4' />
              </Button>
              <ConfirmDialog
                title='Delete Service'
                description='Are you sure you want to delete this service? This action cannot be undone.'
                onConfirm={() => handleDelete(item.id)}
                trigger={
                  <Button
                    variant='ghost'
                    size='icon-sm'
                    className='text-destructive hover:text-destructive'
                  >
                    <Trash2 className='size-4' />
                  </Button>
                }
              />
            </div>
          );
        }}
      />

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-2'
            >
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='order'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='icon'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Heart'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='href'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link (Href)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='/services/personal-care'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end gap-2 pt-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isPending}
                  className='bg-teal text-white hover:bg-teal/90'
                >
                  {isPending && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
