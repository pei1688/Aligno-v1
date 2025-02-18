import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  description: z.optional(z.string()),
  title: z
    .string({ message: "標題為必填" })
    .min(3, { message: "標題至少3字元" }),
});
