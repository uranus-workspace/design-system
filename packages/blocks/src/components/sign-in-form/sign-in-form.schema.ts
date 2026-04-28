import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.email({ error: 'Enter a valid email.' }),
  password: z.string().min(1, 'Enter your password.'),
  rememberMe: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
