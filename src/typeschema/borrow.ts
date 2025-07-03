import { z } from 'zod';

export const borrowSchema = z.object({
  _id: z.string().optional(),
  book: z.string(),
  quantity: z.number().nonnegative(),
  dueDate: z.date(),
});

export type TBorrow = z.infer<typeof borrowSchema>;
