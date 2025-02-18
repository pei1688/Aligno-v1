import { z } from "zod";

export const UpdateWorkspaceSchema = z.object({
  workspaceId: z.string(),
  description: z.optional(z.string()),
  title: z
    .string({ required_error: "標題為必填" })
    .min(3, { message: "標題至少需要 3 個字" }),
});
