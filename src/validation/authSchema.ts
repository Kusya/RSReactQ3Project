import { z } from 'zod';

export const authSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    age: z.number().int().positive(),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password2: z.string().min(6, 'Please confirm your password'),
    gender: z.enum(['male', 'female', 'other'] as const, {
      message: 'Please select a gender',
    }),
    acceptRules: z.boolean().refine((value) => value === true, {
      message: 'You must agree to the terms and conditions.',
    }),
    country: z.string().min(1, 'Please select a country'),
    image: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(val),
        {
          message: 'Invalid image URL',
        }
      ),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Passwords do not match',
    path: ['password2'],
  });
