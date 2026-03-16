'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signToken, COOKIE_NAME } from '@/lib/auth';
import { AdminLoginSchema } from '@/lib/validations';
import type { AdminLoginInput } from '@/lib/validations';
import type { ActionResult } from '@/types';

export async function adminLogin(
  formData: AdminLoginInput
): Promise<ActionResult> {
  const parsed = AdminLoginSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  const { email, password } = parsed.data;

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (email !== validEmail || password !== validPassword) {
    return {
      success: false,
      errors: {
        formErrors: ['Invalid email or password.'],
        fieldErrors: {}
      }
    };
  }

  const token = await signToken({ email });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8 // 8 hours
  });

  redirect('/admin/dashboard');
}
