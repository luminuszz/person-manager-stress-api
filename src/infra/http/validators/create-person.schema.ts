import { z } from 'zod';

export const createPersonSchema = z.object({
  nome: z.string().nonempty().min(3).max(32),
  cpfCnpj: z.string().nonempty().min(11).max(14),
  nascimento: z
    .string()
    .min(10)
    .max(10)
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  seguros: z.array(z.string().nonempty().max(32)).optional().nullable(),
});

export type CreatePersonDto = z.infer<typeof createPersonSchema>;
