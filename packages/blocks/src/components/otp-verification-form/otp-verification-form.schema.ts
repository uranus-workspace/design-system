import { z } from 'zod';

export function createOtpVerificationFormSchema(length: number) {
  const pattern = new RegExp(`^\\d{${length}}$`);
  return z.object({
    code: z.string().regex(pattern, `Informe exatamente ${length} dígitos.`),
  });
}

export type OtpVerificationFormSchemaReturn = ReturnType<typeof createOtpVerificationFormSchema>;

export type OtpVerificationFormValues = z.infer<OtpVerificationFormSchemaReturn>;
