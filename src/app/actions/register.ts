import { registerSchema } from "../libs/zod";

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        username?: string[];
      };
      message?: string;
    }
  | undefined;

export async function handlerRegisterAction(
  state: FormState,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const role = formData.get("role") as string;

  const validatedLoginFields = registerSchema.safeParse({
    email,
    password,
    username,
    role,
  });

  // If any form fields are invalid, return early
  if (!validatedLoginFields.success) {
    return {
      errors: validatedLoginFields.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    user: { email, password, username, role },
  };

  // Call backend api
  // try {
  //   return axiosRequest.post({ email, password });
  // } catch (error) {
  //   if (axios.isAxiosError(error) && error.response) {
  //     return { error: true, message: error.response.data.message };
  //   } else {
  //     return { error: true, message: error };
  //   }
  // }
}
