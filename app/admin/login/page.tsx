'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AdminLoginSchema, type AdminLoginInput } from '@/lib/validations';
import { adminLogin } from '@/actions/admin/login';

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<AdminLoginInput>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: { email: '', password: '' }
  });

  const formErrors = form.formState.errors;

  function onSubmit(data: AdminLoginInput) {
    startTransition(async () => {
      const result = await adminLogin(data);
      if (result && !result.success && result.errors) {
        result.errors.formErrors.forEach((msg) => {
          form.setError('root', { message: msg });
        });
        if (result.errors.fieldErrors.email?.[0]) {
          form.setError('email', {
            message: result.errors.fieldErrors.email[0]
          });
        }
        if (result.errors.fieldErrors.password?.[0]) {
          form.setError('password', {
            message: result.errors.fieldErrors.password[0]
          });
        }
      }
    });
  }

  return (
    <div className='min-h-screen bg-surface-soft flex items-center justify-center px-4'>
      <div className='bg-white rounded-2xl p-8 shadow-elevated w-full max-w-md'>
        {/* Header */}
        <div className='flex flex-col items-center mb-8'>
          <div className='size-12 rounded-xl bg-teal flex items-center justify-center mb-4'>
            <span className='text-white text-xl font-bold'>C</span>
          </div>
          <h1 className='text-2xl font-semibold text-text-dark'>Admin Login</h1>
          <p className='text-sm text-text-mid mt-1'>
            Sign in to manage Capricorn Group Care
          </p>
        </div>

        {/* Global form errors */}
        {formErrors.root?.message && (
          <div className='mb-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3'>
            <p className='text-sm text-destructive'>
              {formErrors.root.message}
            </p>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='admin@example.com'
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='••••••••'
                      autoComplete='current-password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full bg-teal text-white hover:bg-teal-dark'
              disabled={isPending}
            >
              {isPending ? (
                <span className='flex items-center gap-2'>
                  <Loader2 className='size-4 animate-spin' />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
