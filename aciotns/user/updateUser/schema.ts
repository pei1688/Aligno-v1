import { z } from "zod";

export const UpdateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.optional(z.string()),
});
