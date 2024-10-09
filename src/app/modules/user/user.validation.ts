import { z } from 'zod';
import { UserStatus } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
    }),
    email: z.string({ message: 'Email is required' }).email(),
    password: z
      .string()
      .nonempty()
      .max(20, { message: 'Password can not be more than 20 characters' }),
    avatar: z.string().optional(),
    role: z.enum(['admin', 'trainer', 'trainee']).optional(),
    status: z.enum([...UserStatus] as [string, ...string[]]).optional().default('in-progress'),
  }),
});


const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().nonempty().optional(),
      lastName: z.string().nonempty().optional(),
    }).optional(),
    email: z.string({ message: 'Email is required' }).email().optional(),
    password: z
      .string()
      .nonempty()
      .max(20, { message: 'Password can not be more than 20 characters' }).optional(),
    avatar: z.string().optional(),
    role: z.enum(['admin', 'trainer', 'trainee']).optional(),
    status: z.enum([...UserStatus] as [string, ...string[]]).optional().default('in-progress').optional(),
  }),
});


const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = { createUserValidationSchema, updateUserValidationSchema, changeStatusValidationSchema };
