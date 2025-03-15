import axios from "axios";
import { loginSchema } from "../libs/zod";
import { axiosRequest } from "./axios";

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
    return axiosRequest.post({ email, password });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { error: true, message: error.response.data.message };
    } else {
      return { error: true, message: error };
    }
  }
}
