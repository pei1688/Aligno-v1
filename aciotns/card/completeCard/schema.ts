import { z } from "zod";

export const CompleteCardSchema = z.object({
  cardId: z.string().min(1, "卡片 ID 不能為空"),
  completed: z.boolean(),
});
