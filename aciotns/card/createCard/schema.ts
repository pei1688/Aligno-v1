import { z } from "zod";

export const CreateCardSchema = z.object({
  title: z.string().min(1, { message: "標題為必須" }),
  boardId: z.string(),
  listId: z.string(),
});
