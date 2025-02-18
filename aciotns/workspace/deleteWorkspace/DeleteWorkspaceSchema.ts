import { z } from "zod";

export const DeleteWorkspaceListSchema = z.object({
  workspaceId: z.string(),
});
