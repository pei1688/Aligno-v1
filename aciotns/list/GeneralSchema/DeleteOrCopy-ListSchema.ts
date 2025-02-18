import { z } from "zod";

export const DeleteOrCopyListSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});
