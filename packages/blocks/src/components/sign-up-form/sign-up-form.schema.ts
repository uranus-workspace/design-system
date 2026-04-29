import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string().min(1, 'Informe seu nome.').trim(),
  email: z.email({ error: 'Informe um email válido.' }),
  password: z.string().min(8, 'A senha precisa ter ao menos 8 caracteres.'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Você precisa aceitar os termos para continuar.',
  }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
