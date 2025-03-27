import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "Email is required." }).email(),
  password: z
    .string({ message: "Password is required." })
    .min(5, "Password should be at least 5 characteres long.")
    .max(20, "Password should be max 20 characteres long."),
});

enum ROLES {
  admin = "admin",
  reader = "reader",
  editor = "editor",
}
export const registerSchema = loginSchema
  .extend({
    username: z.string({ message: "Username is required." }),
    role: z.nativeEnum(ROLES, {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Role must be selected!" };
          case "invalid_enum_value":
            return { message: "Invalid role selected" };
          default:
            return { message: "Invalid role selected" };
        }
      },
    }),
  })
  .required();
