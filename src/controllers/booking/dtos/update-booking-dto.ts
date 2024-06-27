import { z } from 'zod';

export const updateBookingSchema = z
  .object({
    trainName: z.string().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
  })
  .strict();

export type UpdateBookingDto = z.infer<typeof updateBookingSchema>;
