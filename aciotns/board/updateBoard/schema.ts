import { z } from "zod";

export const UpdateBoardSchema = z.object({
  title: z.string().min(1, { message: "標題為必須" }),
  id: z.string(),
});
