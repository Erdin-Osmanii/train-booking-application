import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
}).strict();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
