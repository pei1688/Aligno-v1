import { z } from "zod";

export const UpdateListSchema = z.object({
  title: z
    .string({ message: "標題為必須" })
    .min(3, { message: "標題至少3字元" }),
  id: z.string(),
  boardId: z.string(),
});
