import axios from "axios";
import { z } from "zod";

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const loginUrl = process.env.BACKEND_URL_LOGIN || "";

const loginSchema = z.object({
  email: z.string({ message: "Email is required." }).email(),
  password: z
    .string({ message: "Password is required." })
    .min(5, "Password should be at least 5 characteres long.")
    .max(20, "Password should be max 20 characteres long."),
});

export async function handlerLoginAction(state: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedLoginFields = loginSchema.safeParse({
    email,
    password,
  });

  // If any form fields are invalid, return early
  if (!validatedLoginFields.success) {
    return {
      errors: validatedLoginFields.error.flatten().fieldErrors,
    };
  }

  // Call backend api
  try {
    return await axios.post(loginUrl, {
      email,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { error: true, message: error.response.data.message };
    } else {
      return { error: true, message: error };
    }
  }
}
