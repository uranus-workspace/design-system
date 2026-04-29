import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.email({ error: 'Informe um email válido.' }),
  password: z.string().min(1, 'Informe sua senha.'),
  rememberMe: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
