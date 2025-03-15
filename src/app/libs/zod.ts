import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "Email is required." }).email(),
  password: z
    .string({ message: "Password is required." })
    .min(5, "Password should be at least 5 characteres long.")
    .max(20, "Password should be max 20 characteres long."),
});
