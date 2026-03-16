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
import { useAdminFAQ } from '@/hooks/useAdminData';
import { FAQItemSchema, type FAQItemInput } from '@/lib/validations';
import type { FAQItem } from '@/types';
import { updateFAQ } from '@/actions/admin/updateFAQ';
import { deleteRecord } from '@/actions/admin/deleteRecord';

const columns = [
  { key: 'order', label: 'Order', className: 'w-16' },
  { key: 'question', label: 'Question' },
  { key: 'visible', label: 'Visible', className: 'w-24' }
];

export default function FAQPage() {
  const { items, isLoading, mutate } = useAdminFAQ();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FAQItemInput>({
    resolver: zodResolver(FAQItemSchema),
    defaultValues: { order: '', question: '', answer: '', visible: true }
  });

  function openAdd() {
    setEditingItem(null);
    form.reset({ order: '', question: '', answer: '', visible: true });
    setDialogOpen(true);
  }

  function openEdit(item: FAQItem) {
    setEditingItem(item);
    form.reset({
      order: String(item.order),
      question: item.question,
      answer: item.answer,
      visible: item.visible
    });
    setDialogOpen(true);
  }

  function toggleVisible(item: FAQItem) {
    startTransition(async () => {
      const result = await updateFAQ(
        {
          order: String(item.order),
          question: item.question,
          answer: item.answer,
          visible: !item.visible
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

  function onSubmit(data: FAQItemInput) {
    startTransition(async () => {
      const result = await updateFAQ(data, editingItem?.id);
      if (result.success) {
        toast.success(editingItem ? 'FAQ updated.' : 'FAQ question added.');
        void mutate();
        setDialogOpen(false);
      } else {
        toast.error(result.errors?.formErrors[0] ?? 'Failed to save.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteRecord(id, 'faqItem');
      if (result.success) {
        toast.success('FAQ item deleted.');
        void mutate();
      } else {
        toast.error('Failed to delete.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-text-dark'>FAQ</h1>
        <Button
          onClick={openAdd}
          className='bg-teal text-white hover:bg-teal/90'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Question
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={items as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        emptyLabel='FAQ items'
        renderCell={(key, row) => {
          const item = row as unknown as FAQItem;
          if (key === 'question')
            return <span>{String(row.question ?? '').slice(0, 60)}…</span>;
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
          const item = row as unknown as FAQItem;
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
                title='Delete FAQ'
                description='Are you sure you want to delete this FAQ item?'
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
              {editingItem ? 'Edit FAQ' : 'Add FAQ Question'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-2'
            >
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
                name='question'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='answer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name='visible'
                render={({ field }) => (
                  <div className='flex items-center gap-2'>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className='text-sm font-medium text-text-dark'>
                      Visible
                    </Label>
                  </div>
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
