'use client';

import { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, X, Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useAdminRNPackages } from '@/hooks/useAdminData';
import { RNPackageSchema, type RNPackageInput } from '@/lib/validations';
import type { RNPackage } from '@/types';
import { updateRNPackage } from '@/actions/admin/updateRNPackage';

export default function RNPackagesPage() {
  const { packages, isLoading, mutate } = useAdminRNPackages();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RNPackage | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RNPackageInput>({
    resolver: zodResolver(RNPackageSchema),
    defaultValues: {
      tier: '',
      price: '',
      tagline: '',
      features: [''],
      featured: false
    }
  });

  const features = form.watch('features') ?? [];

  function openEdit(item: RNPackage) {
    setEditingItem(item);
    form.reset({
      tier: item.tier,
      price: String(item.price),
      tagline: item.tagline,
      features: item.features.length > 0 ? item.features : [''],
      featured: item.featured
    });
    setDialogOpen(true);
  }

  function addFeature() {
    form.setValue('features', [...features, '']);
  }

  function removeFeature(idx: number) {
    form.setValue(
      'features',
      features.filter((_, i) => i !== idx)
    );
  }

  function updateFeature(idx: number, value: string) {
    const updated = [...features];
    updated[idx] = value;
    form.setValue('features', updated);
  }

  function onSubmit(data: RNPackageInput) {
    if (!editingItem) return;
    startTransition(async () => {
      const result = await updateRNPackage(data, editingItem.id);
      if (result.success) {
        toast.success('Package updated.');
        void mutate();
        setDialogOpen(false);
      } else {
        toast.error(result.errors?.formErrors[0] ?? 'Failed to save.');
      }
    });
  }

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-64 w-full' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-text-dark'>
        RN Consultation Packages
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className='bg-white rounded-2xl p-6 shadow-card relative'
          >
            {pkg.featured && (
              <div className='absolute top-4 right-4'>
                <Badge className='bg-teal text-white border-0 text-xs'>
                  <Star className='size-3 mr-1' />
                  Featured
                </Badge>
              </div>
            )}
            <p className='text-xs text-text-mid uppercase tracking-wide'>
              {pkg.tier}
            </p>
            <p className='text-3xl font-bold text-text-dark mt-1'>
              ${pkg.price}
            </p>
            <p className='text-sm text-text-mid mt-1'>{pkg.tagline}</p>
            <ul className='mt-4 space-y-2'>
              {pkg.features.map((feat, i) => (
                <li
                  key={i}
                  className='text-sm text-text-dark flex items-start gap-2'
                >
                  <span className='text-teal mt-0.5'>✓</span>
                  {feat}
                </li>
              ))}
            </ul>
            <Button
              variant='outline'
              size='sm'
              className='mt-6 w-full'
              onClick={() => openEdit(pkg)}
            >
              <Pencil className='mr-2 h-3.5 w-3.5' />
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className='sm:max-w-lg max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Package — {editingItem?.tier}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-2'
            >
              <FormField
                control={form.control}
                name='tier'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='299'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='tagline'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='space-y-2'>
                <Label className='text-sm font-medium text-text-dark'>
                  Features
                </Label>
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className='flex gap-2'
                  >
                    <Input
                      value={feat}
                      onChange={(e) => updateFeature(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}`}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon-sm'
                      onClick={() => removeFeature(idx)}
                      disabled={features.length <= 1}
                    >
                      <X className='size-4' />
                    </Button>
                  </div>
                ))}
                {form.formState.errors.features && (
                  <p className='text-sm text-destructive'>
                    {String(form.formState.errors.features.message ?? '')}
                  </p>
                )}
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addFeature}
                >
                  <Plus className='mr-1 h-3.5 w-3.5' />
                  Add Feature
                </Button>
              </div>

              <Controller
                control={form.control}
                name='featured'
                render={({ field }) => (
                  <div className='flex items-center gap-2'>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className='text-sm font-medium text-text-dark'>
                      Mark as Featured
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
