import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required().strict();

export type CreateUserDto = z.infer<typeof createUserSchema>;
