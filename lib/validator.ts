import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be atleast 3 character"),
  description: z
    .string()
    .min(3, "Description must be atleast 3 character")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "location must be atleast 3 character")
    .max(400, "location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
