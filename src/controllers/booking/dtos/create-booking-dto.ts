import { z } from 'zod';

export const createBookingSchema = z
  .object({
    trainName: z.string(),
    departureTime: z.string(),
    arrivalTime: z.string(),
    origin: z.string(),
    destination: z.string(),
  })
  .required().strict();

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
