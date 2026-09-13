import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2).max(150),
  sku: z.string().trim().min(2).max(60),
  barcode: z.string().trim().max(64).optional().or(z.literal("")),
  categoryId: z.string().min(1),
  unit: z.string().trim().min(1).max(20),
  minimumStock: z.coerce.number().int().min(0),
  description: z.string().trim().max(1000).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
