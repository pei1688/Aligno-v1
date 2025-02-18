import { z } from "zod";

export const UpdateCardOrderSchema = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
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
