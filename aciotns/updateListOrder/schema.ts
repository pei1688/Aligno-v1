import { z } from "zod";

export const UpdateListOrderSchema = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z
        .string()
        .datetime()
        .transform((val) => new Date(val)), // ✅ 轉換為 Date
      updatedAt: z
        .string()
        .datetime()
        .transform((val) => new Date(val)), // ✅ 轉換為 Date
    })
  ),
});
