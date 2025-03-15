// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { AxiosResponse } from "axios";
// // import type { NextApiRequest, NextApiResponse } from "next";
// // import { z } from "zod";

// // export const loginSchema = z.object({
// //   email: z.string({ message: "Email is required." }).email(),
// //   password: z
// //     .string({ message: "Password is required." })
// //     .min(5, "Password should be at least 5 characteres long.")
// //     .max(20, "Password should be max 20 characteres long."),
// // });

// // export default async function handlerLogin(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   console.log("req.body", req.body);
// //   const parsed = loginSchema.parse(req.body);
// //   console.log("parsed", parsed);
// //   // ...
// // }

// // export type LoginSchema = z.infer<typeof loginSchema>;

// export type FormState =
//   | {
//       errors?: {
//         name?: string[];
//         email?: string[];
//         password?: string[];
//       };
//       message?: string;
//     }
//   | undefined;

// export type State =
//   | AxiosResponse<any, any>
//   | {
//       errors: {
//         email?: string[] | undefined;
//         password?: string[] | undefined;
//       };
//       error?: undefined;
//       message?: undefined;
//     }
//   | {
//       error: boolean;
//       message: any;
//       errors?: undefined;
//     }
//   | undefined;
