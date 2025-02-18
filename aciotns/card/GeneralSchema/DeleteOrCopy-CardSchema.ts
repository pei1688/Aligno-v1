import { z } from "zod";

export const DeleteOrCopyCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});
