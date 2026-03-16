'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useAdminHero } from '@/hooks/useAdminData';
import { HeroContentSchema, type HeroContentInput } from '@/lib/validations';
import { updateHeroContent } from '@/actions/admin/updateHeroContent';

export default function HeroPage() {
  const { hero, isLoading, mutate } = useAdminHero();
  const [isPending, startTransition] = useTransition();

  const form = useForm<HeroContentInput>({
    resolver: zodResolver(HeroContentSchema),
    defaultValues: {
      eyebrow: '',
      headline: '',
      subheadline: '',
      primaryCTA: { label: '', href: '' },
      secondaryCTA: { label: '', href: '' },
      heroImage: '',
      heroImageAlt: ''
    }
  });

  useEffect(() => {
    if (hero) form.reset(hero);
  }, [hero, form]);

  function onSubmit(data: HeroContentInput) {
    startTransition(async () => {
      const result = await updateHeroContent(data);
      if (result.success) {
        toast.success('Hero content saved successfully.');
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
      <h1 className='text-2xl font-semibold text-text-dark'>Hero Content</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='bg-white rounded-2xl p-6 shadow-card space-y-5'
        >
          <FormField
            control={form.control}
            name='eyebrow'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eyebrow</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='headline'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='subheadline'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subheadline</FormLabel>
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

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='primaryCTA.label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary CTA Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='primaryCTA.href'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary CTA Href</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='secondaryCTA.label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary CTA Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='secondaryCTA.href'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary CTA Href</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='heroImage'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
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
            name='heroImageAlt'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image Alt Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
