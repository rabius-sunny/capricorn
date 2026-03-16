'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminGallery } from '@/hooks/useAdminData';
import { GalleryImageSchema, type GalleryImageInput } from '@/lib/validations';
import type { GalleryImage } from '@/types';
import { updateGalleryImage } from '@/actions/admin/updateGalleryImage';
import { deleteRecord } from '@/actions/admin/deleteRecord';

const ROOM_OPTIONS = [
  'Exterior',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining Room',
  'Bathroom'
];

const selectClass =
  'h-8 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50';

export default function GalleryPage() {
  const { images, isLoading, mutate } = useAdminGallery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<GalleryImageInput>({
    resolver: zodResolver(GalleryImageSchema),
    defaultValues: { src: '', alt: '', room: '', order: '' }
  });

  function openAdd() {
    setEditingItem(null);
    form.reset({ src: '', alt: '', room: '', order: '' });
    setDialogOpen(true);
  }

  function openEdit(item: GalleryImage) {
    setEditingItem(item);
    form.reset({
      src: item.src,
      alt: item.alt,
      room: item.room,
      order: String(item.order)
    });
    setDialogOpen(true);
  }

  function onSubmit(data: GalleryImageInput) {
    startTransition(async () => {
      const result = await updateGalleryImage(data, editingItem?.id);
      if (result.success) {
        toast.success(editingItem ? 'Image updated.' : 'Image added.');
        void mutate();
        setDialogOpen(false);
      } else {
        toast.error(result.errors?.formErrors[0] ?? 'Failed to save.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteRecord(id, 'galleryImage');
      if (result.success) {
        toast.success('Image deleted.');
        void mutate();
      } else {
        toast.error('Failed to delete.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-text-dark'>Gallery</h1>
        <Button
          onClick={openAdd}
          className='bg-teal text-white hover:bg-teal/90'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Image
        </Button>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className='aspect-[4/3] rounded-xl bg-muted animate-pulse'
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className='bg-white rounded-2xl p-12 shadow-card text-center'>
          <p className='text-sm text-text-mid'>No gallery images yet.</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.map((img) => (
            <div
              key={img.id}
              className='relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-soft group'
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
                <Button
                  size='icon-sm'
                  variant='secondary'
                  onClick={() => openEdit(img)}
                >
                  <Pencil className='size-3.5' />
                </Button>
                <ConfirmDialog
                  title='Delete Image'
                  description='Are you sure you want to remove this image from the gallery?'
                  onConfirm={() => handleDelete(img.id)}
                  trigger={
                    <Button
                      size='icon-sm'
                      variant='destructive'
                    >
                      <Trash2 className='size-3.5' />
                    </Button>
                  }
                />
              </div>
              <div className='absolute bottom-2 left-2'>
                <Badge className='bg-black/60 text-white border-0 text-xs'>
                  {img.room}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Image' : 'Add Gallery Image'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-2'
            >
              <FormField
                control={form.control}
                name='src'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
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

              <FormField
                control={form.control}
                name='alt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Describe the image…'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='room'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Category</FormLabel>
                    <FormControl>
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        className={selectClass}
                      >
                        <option value=''>Select room…</option>
                        {ROOM_OPTIONS.map((r) => (
                          <option
                            key={r}
                            value={r}
                          >
                            {r}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
