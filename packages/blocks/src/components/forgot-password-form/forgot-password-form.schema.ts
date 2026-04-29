import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.email({ error: 'Informe um email válido.' }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;
