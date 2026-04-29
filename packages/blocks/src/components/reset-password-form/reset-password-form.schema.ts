import { z } from 'zod';

export function createResetPasswordFormSchema(minLength: number) {
  return z
    .object({
      password: z
        .string()
        .min(minLength, `A senha precisa ter ao menos ${minLength} caracteres.`),
      confirmPassword: z
        .string()
        .min(minLength, `A senha precisa ter ao menos ${minLength} caracteres.`),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'As senhas não coincidem.',
          path: ['confirmPassword'],
        });
      }
    });
}

export type ResetPasswordFormSchema = ReturnType<typeof createResetPasswordFormSchema>;

export const resetPasswordFormSchemaDefault = createResetPasswordFormSchema(8);

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchemaDefault>;
