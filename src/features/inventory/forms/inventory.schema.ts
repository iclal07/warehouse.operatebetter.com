import { z } from "zod";

const location = z.object({
  warehouseId: z.string().min(1),
  shelfId: z.string().min(1),
});

export const receiptSchema = location.extend({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
  description: z.string().max(500).optional(),
});

export const dispatchSchema = receiptSchema;

export const transferSchema = z.object({
  productId: z.string().min(1),
  sourceWarehouseId: z.string().min(1),
  sourceShelfId: z.string().min(1),
  targetWarehouseId: z.string().min(1),
  targetShelfId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
}).refine(value => value.sourceShelfId !== value.targetShelfId, {
  message: "Kaynak ve hedef raf aynı olamaz",
  path: ["targetShelfId"],
});

export const stockCountSchema = location.extend({
  productId: z.string().min(1),
  countedQuantity: z.coerce.number().int().min(0),
  description: z.string().max(500).optional(),
});
