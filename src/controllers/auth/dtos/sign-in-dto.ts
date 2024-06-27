import { z } from 'zod';

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required()
  .strict();

export type SignInDto = z.infer<typeof signInSchema>;
