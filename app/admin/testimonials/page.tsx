'use client';

import { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useAdminTestimonials } from '@/hooks/useAdminData';
import { TestimonialSchema, type TestimonialInput } from '@/lib/validations';
import type { Testimonial } from '@/types';
import { updateTestimonial } from '@/actions/admin/updateTestimonial';
import { deleteRecord } from '@/actions/admin/deleteRecord';

const selectClass =
  'h-8 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'relationship', label: 'Relationship' },
  { key: 'quote', label: 'Quote' },
  { key: 'rating', label: 'Rating', className: 'w-28' },
  { key: 'visible', label: 'Visible', className: 'w-24' }
];

export default function TestimonialsPage() {
  const { testimonials, isLoading, mutate } = useAdminTestimonials();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TestimonialInput>({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: {
      name: '',
      relationship: '',
      quote: '',
      rating: '5',
      visible: true,
      imageUrl: ''
    }
  });

  function openAdd() {
    setEditingItem(null);
    form.reset({
      name: '',
      relationship: '',
      quote: '',
      rating: '5',
      visible: true,
      imageUrl: ''
    });
    setDialogOpen(true);
  }

  function openEdit(item: Testimonial) {
    setEditingItem(item);
    form.reset({
      name: item.name,
      relationship: item.relationship,
      quote: item.quote,
      rating: String(item.rating),
      visible: item.visible,
      imageUrl: item.imageUrl ?? ''
    });
    setDialogOpen(true);
  }

  function toggleVisible(item: Testimonial) {
    startTransition(async () => {
      const result = await updateTestimonial(
        {
          name: item.name,
          relationship: item.relationship,
          quote: item.quote,
          rating: String(item.rating),
          visible: !item.visible,
          imageUrl: item.imageUrl
        },
        item.id
      );
      if (result.success) {
        void mutate();
      } else {
        toast.error('Failed to update visibility.');
      }
    });
  }

  function onSubmit(data: TestimonialInput) {
    startTransition(async () => {
      const result = await updateTestimonial(data, editingItem?.id);
      if (result.success) {
        toast.success(
          editingItem ? 'Testimonial updated.' : 'Testimonial added.'
        );
        void mutate();
        setDialogOpen(false);
      } else {
        toast.error(result.errors?.formErrors[0] ?? 'Failed to save.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteRecord(id, 'testimonial');
      if (result.success) {
        toast.success('Testimonial deleted.');
        void mutate();
      } else {
        toast.error('Failed to delete.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-text-dark'>Testimonials</h1>
        <Button
          onClick={openAdd}
          className='bg-teal text-white hover:bg-teal/90'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Testimonial
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={testimonials as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        emptyLabel='testimonials'
        renderCell={(key, row) => {
          const item = row as unknown as Testimonial;
          if (key === 'quote')
            return <span>{String(row.quote ?? '').slice(0, 60)}…</span>;
          if (key === 'rating')
            return <span>{'⭐'.repeat(Number(row.rating ?? 1))}</span>;
          if (key === 'visible')
            return (
              <Switch
                checked={item.visible}
                onCheckedChange={() => toggleVisible(item)}
                size='sm'
              />
            );
          return <span>{String(row[key] ?? '')}</span>;
        }}
        actions={(row) => {
          const item = row as unknown as Testimonial;
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
                title='Delete Testimonial'
                description='Are you sure you want to delete this testimonial?'
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
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-2'
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='relationship'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship / Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Daughter of resident'
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
                name='quote'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='rating'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <select
                          value={field.value}
                          onChange={field.onChange}
                          className={selectClass}
                        >
                          {['1', '2', '3', '4', '5'].map((r) => (
                            <option
                              key={r}
                              value={r}
                            >
                              {r} Star{r !== '1' ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name='visible'
                  render={({ field }) => (
                    <div className='space-y-1.5'>
                      <Label className='text-sm font-medium text-text-dark'>
                        Visible
                      </Label>
                      <div className='flex items-center gap-2 pt-1'>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className='text-sm text-text-mid'>
                          {field.value ? 'Shown' : 'Hidden'}
                        </span>
                      </div>
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image (optional)</FormLabel>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
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
