import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string().min(1, 'Enter your name.').trim(),
  email: z.email({ error: 'Enter a valid email.' }),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms to continue.',
  }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
