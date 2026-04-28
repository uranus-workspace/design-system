import { z } from 'zod';

export function createResetPasswordFormSchema(minLength: number) {
  return z
    .object({
      password: z.string().min(minLength, `Password must be at least ${minLength} characters.`),
      confirmPassword: z
        .string()
        .min(minLength, `Password must be at least ${minLength} characters.`),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords do not match.',
          path: ['confirmPassword'],
        });
      }
    });
}

export type ResetPasswordFormSchema = ReturnType<typeof createResetPasswordFormSchema>;

export const resetPasswordFormSchemaDefault = createResetPasswordFormSchema(8);

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchemaDefault>;
