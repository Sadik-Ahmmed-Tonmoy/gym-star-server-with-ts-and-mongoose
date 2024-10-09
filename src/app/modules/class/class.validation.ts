import { Types } from 'mongoose';
import { z } from 'zod';

const createClassValidationSchema = z.object({
  body: z.object({
    className: z.string().nonempty(),
    trainer: z.string().nonempty(),
    date: z.string().nonempty(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
      message: 'Invalid time format (use HH:MM)',
    }),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: 'Invalid time format (use HH:MM)',
      })
      .optional(),
    duration: z.string().default('2hrs'),
    maxTrainees: z.number().min(1, 'Cannot have less than 1 trainees').max(10, 'Cannot have more than 10 trainees in one class').optional().default(10),
    enrolledTrainees: z
      .array(z.instanceof(Types.ObjectId, { message: 'Invalid trainee ID' }))
      .max(10, { message: 'Cannot have more than 10 trainees in one class' })
      .optional(),
    description: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateClassValidationSchema = z.object({
  body: z.object({
    className: z.string().optional(),
    trainer: z.string().optional(),
    date: z.string().optional(),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: 'Invalid time format (use HH:MM)',
      })
      .optional(),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
        message: 'Invalid time format (use HH:MM)',
      })
      .optional(),
    duration: z.number().optional(),
    maxTrainees: z
      .number()
      .min(1)
      .max(10, { message: 'Cannot have more than 10 trainees in one class' })
      .optional(),
    enrolledTrainees: z
      .array(z.instanceof(Types.ObjectId, { message: 'Invalid trainee ID' }))
      .max(10, { message: 'Cannot have more than 10 trainees in one class' })
      .optional(),
    description: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ClassValidation = {
  createClassValidationSchema,
  updateClassValidationSchema,
};
