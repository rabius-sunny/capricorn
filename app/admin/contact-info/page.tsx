'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useAdminContactInfo } from '@/hooks/useAdminData';
import { ContactInfoSchema, type ContactInfoInput } from '@/lib/validations';
import { updateContactInfo } from '@/actions/admin/updateContactInfo';

export default function ContactInfoPage() {
  const { contactInfo, isLoading, mutate } = useAdminContactInfo();
  const [isPending, startTransition] = useTransition();
  const [areas, setAreas] = useState<string[]>([]);
  const [newArea, setNewArea] = useState('');

  const form = useForm<ContactInfoInput>({
    resolver: zodResolver(ContactInfoSchema),
    defaultValues: {
      companyName: '',
      email: '',
      website: '',
      phones: [
        { name: '', number: '' },
        { name: '', number: '' }
      ],
      address: '',
      serviceAreas: []
    }
  });

  useEffect(() => {
    if (contactInfo) {
      const phones =
        contactInfo.phones.length >= 2
          ? contactInfo.phones
          : [
              contactInfo.phones[0] ?? { name: '', number: '' },
              contactInfo.phones[1] ?? { name: '', number: '' }
            ];
      form.reset({
        companyName: contactInfo.companyName,
        email: contactInfo.email,
        website: contactInfo.website,
        phones,
        address: contactInfo.address ?? '',
        serviceAreas: contactInfo.serviceAreas
      });
      setAreas(contactInfo.serviceAreas);
    }
  }, [contactInfo, form]);

  function addArea() {
    if (!newArea.trim()) return;
    const updated = [...areas, newArea.trim()];
    setAreas(updated);
    form.setValue('serviceAreas', updated);
    setNewArea('');
  }

  function removeArea(idx: number) {
    const updated = areas.filter((_, i) => i !== idx);
    setAreas(updated);
    form.setValue('serviceAreas', updated);
  }

  function onSubmit(data: ContactInfoInput) {
    startTransition(async () => {
      const result = await updateContactInfo({ ...data, serviceAreas: areas });
      if (result.success) {
        toast.success('Contact info saved.');
        void mutate();
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
        Contact Information
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='bg-white rounded-2xl p-6 shadow-card space-y-5'
        >
          <FormField
            control={form.control}
            name='companyName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://…'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-3'>
            <p className='text-sm font-medium text-text-dark'>Phone Numbers</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='phones.0.name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone 1 Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Main Office'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phones.0.number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone 1 Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='(469) 555-0100'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='phones.1.name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone 2 Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='After Hours'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phones.1.number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone 2 Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='(469) 555-0200'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='123 Main St, McKinney, TX 75070'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='space-y-2'>
            <p className='text-sm font-medium text-text-dark'>Service Areas</p>
            <div className='flex flex-wrap gap-2 min-h-[2rem]'>
              {areas.map((area, idx) => (
                <Badge
                  key={idx}
                  variant='outline'
                  className='border-teal text-teal gap-1 pl-2 pr-1'
                >
                  {area}
                  <button
                    type='button'
                    onClick={() => removeArea(idx)}
                    className='ml-0.5 rounded-full hover:bg-teal/10 p-0.5'
                  >
                    <X className='size-3' />
                  </button>
                </Badge>
              ))}
            </div>
            <div className='flex gap-2'>
              <Input
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                placeholder='e.g. McKinney'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addArea();
                  }
                }}
                className='max-w-xs'
              />
              <Button
                type='button'
                variant='outline'
                onClick={addArea}
                size='sm'
              >
                <Plus className='mr-1 h-3.5 w-3.5' />
                Add
              </Button>
            </div>
            {form.formState.errors.serviceAreas && (
              <p className='text-sm text-destructive'>
                {String(form.formState.errors.serviceAreas.message ?? '')}
              </p>
            )}
          </div>

          <Button
            type='submit'
            disabled={isPending}
            className='bg-teal text-white hover:bg-teal/90'
          >
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
