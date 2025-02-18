import { z } from "zod";

export const CreateListSchema = z.object({
  title: z.string().min(1, { message: "標題為必須" }),
  boardId: z.string(),
});
