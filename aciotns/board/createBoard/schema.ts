import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({ message: "標題為必須" })
    .min(3, { message: "標題至少3字元" }),
  image: z
    .string({ message: "請選擇圖片" })
    .min(1, { message: "請選擇圖片" }),
  workspaceId: z.string().optional(),
});
